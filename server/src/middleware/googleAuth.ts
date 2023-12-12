import { OAuth2Client } from "google-auth-library";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../database/database";
import {
  generateAccessToken,
  generateRefreshToken,
  getExpDate,
  saveRefreshToken,
} from "../utils/jwt";

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage"
);

export const googleAuth = async (req, res, next) => {
  let decodedToken;
  try {
    if (req.body.type == "onetape") {
      decodedToken = jwt.decode(req.body.code) as JwtPayload;
    } else {
      const { tokens } = await oAuth2Client.getToken(req.body.code);
      if (tokens.id_token) {
        decodedToken = jwt.decode(tokens.id_token) as JwtPayload;
      }
    }

    if (decodedToken) {
      const userExsit = await prisma.account.findFirst({
        where: {
          AND: [{ googleId: decodedToken.sub }, { email: decodedToken.email }],
        },
      });
      if (userExsit) {
        //Sign In

        const accessToken = generateAccessToken(userExsit);
        const refreshToken = generateRefreshToken(userExsit);
        await saveRefreshToken(refreshToken);
        res.cookie("access_token", accessToken, { httpOnly: true });
        res.cookie("refresh_token", refreshToken, {
          httpOnly: true,
          path: "/auth/refresh",
        });

        res.status(200).json({
          status: "success",
          message: "authentication successful",
          data: { id: userExsit.id, username: userExsit.username },
          exp: getExpDate(accessToken),
        });
        return next();
      } else {
        const ex = await prisma.account.findFirst({
          where: {
            OR: [{ googleId: decodedToken.sub }, { email: decodedToken.email }],
          },
        });
        if (ex) {
          const err = new Error("email already used ");
          err.name = "UnauthorizedError";
          return next(err);
        } else {
          //Sign Up
          let exsit;
          let username;
          let n = 0;

          username = String(decodedToken.name).toLowerCase().replace(/ /g, "");
          exsit = await prisma.account.findFirst({
            where: {
              username: username,
            },
          });

          while (exsit !== null) {
            n++;
            username = String(decodedToken.name)
              .toLowerCase()
              .replace(/ /g, "")
              .concat(String(n));
            exsit = await prisma.account.findFirst({
              where: {
                username: username,
              },
            });
          }

          const user = await prisma.account.create({
            data: {
              username: username,
              googleId: decodedToken.sub,
              email: decodedToken.email,
            },
          });

          const accessToken = generateAccessToken(user);
          const refreshToken = generateRefreshToken(user);
          await saveRefreshToken(refreshToken);
          res.cookie("access_token", accessToken, { httpOnly: true });
          res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            path: "/auth/refresh",
          });

          res.status(200).json({
            status: "success",
            message: "user successfully created.",
            data: { id: user.id, username: user.username, email: user.email },
            exp: getExpDate(accessToken),
          });
          return next();
        }
      }
    } else {
      throw new Error("error when authentication");
    }
  } catch (error) {
    if (!error?.name) {
      const err = new Error("token is invalide");
      err.name = "UnauthorizedError";
      return next(err);
    } else {
      const err = new Error("error when authentication");
      err.name = "UnauthorizedError";
      return next(err);
    }
  }
};
