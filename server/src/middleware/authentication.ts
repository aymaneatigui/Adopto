import { type } from "os";
import prisma from "../database/database";
import {
  generateAccessToken,
  generateRefreshToken,
  refreshAccessToken,
  saveRefreshToken,
} from "../utils/jwt";
import { comparePasswords, hashPassword } from "../utils/passwords";

export const signin = async (req, res, next) => {
  try {
    const user = await prisma.account.findUnique({
      where: {
        username: req.body.username,
      },
    });
    if (user === null) {
      const err = new Error("incorect username");
      err.name = "UnauthorizedError";
      return next(err);
    }

    const isvalid = await comparePasswords(req.body.password, user.password);

    if (!isvalid) {
      const err = new Error("incorect password ");
      err.name = "UnauthorizedError";
      return next(err);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    await saveRefreshToken(refreshToken);

    res.cookie("access_token", accessToken, { httpOnly: true });
    res.cookie("refresh_token", refreshToken, { httpOnly: true, path: '/auth/refresh'});

    res.status(200).json({ message: "Tokens refreshed", accessToken, refreshToken});
    next();
  } catch (error) {
    if (!error?.name) {
      const err = new Error("Token is invalide");
      err.name = "UnauthorizedError";
      return next(err);
    } else {
      return next(error);
    }
  }
};

export const signup = async (req, res, next) => {
  try {
    const exsit = await prisma.account.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (exsit !== null) {
      const err = new Error("Username has already been taken");
      err.name = "BadRequestError";
      return next(err);
    }

    const password = await hashPassword(req.body.password);
    const user = await prisma.account.create({
      data: {
        username: req.body.username,
        password: password,
      },
    });
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    await saveRefreshToken(refreshToken);
    res.cookie("access_token", accessToken, { httpOnly: true });
    res.cookie("refresh_token", refreshToken, { httpOnly: true, path: '/auth/refresh' });

    res.status(200).json({ message: "Tokens refreshed" });
    next();
  } catch (error) {
    console.log(error);
    const err = new Error("Error in sign-up");
    err.name = "UnauthorizedError";
    return next(err);
  }
};
export const signout = (req, res, next) => {};
