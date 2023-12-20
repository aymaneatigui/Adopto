import { OAuth2Client } from "google-auth-library";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../database/database";
import {
  generateAccessToken,
  generateRefreshToken,
  getExpDate,
  saveRefreshToken,
} from "../utils/jwt";
import { downloadImage, toBase64 } from "../utils/img";

// Initialize OAuth2Client with Google Client ID, Secret and redirect URI

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage"
);

// Define the googleAuth function

export const googleAuth = async (req, res, next) => {
  let decodedToken;
  try {
    // Check if the request type is 'onetape'

    if (req.body.type == "onetape") {
      decodedToken = jwt.decode(req.body.code) as JwtPayload;
    } else {
      // Get tokens and user data from Google

      const { tokens } = await oAuth2Client.getToken(req.body.code);
      if (tokens.id_token) {
        // Decode the ID token

        decodedToken = jwt.decode(tokens.id_token) as JwtPayload;
      }
    }

    // If the token is decoded successfully

    if (decodedToken) {
      // Check if the user exists in the database

      const userExsit = await prisma.account.findFirst({
        where: {
          AND: [{ googleId: decodedToken.sub }, { email: decodedToken.email }],
        },
      });

      // If the user exists -----------------------------------

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

        const userProfile = await prisma.profile.findFirst({
          where: {
            accountId: userExsit.id,
          },
        });

        res.status(200).json({
          status: "success",
          message: "authentication successful",
          account: {
            id: userExsit.id,
            username: userExsit.username,
            email: userExsit.email,
          },
          profile: {
            ...userProfile,
            picture: toBase64(userProfile.picture),
          },
          exp: getExpDate(accessToken),
        });
        return next();

        // If the user does not exist, check if the email or Google ID is already used
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

          // Generate a username from the decoded token's name

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
          const imageBinary = await downloadImage(decodedToken.picture);
          try {
            await prisma.profile.create({
              data: {
                accountId: user.id,
                fname: decodedToken.given_name,
                lname: decodedToken.family_name,
                picture: imageBinary,
              },
            });
          } catch (error) {
            await prisma.account.delete({
              where: { id: user.id },
            });
            const err = new Error("error in signup with google");
            err.name = "UnauthorizedError";
            return next(err);
          }

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
            account: {
              id: user.id,
              username: user.username,
              email: user.email,
            },
            profile: {
              fname: decodedToken.given_name,
              lname: decodedToken.family_name,
              picture: toBase64(imageBinary),
            },
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
