import prisma from "../database/database";
import jwt from "jsonwebtoken";

import {
  generateAccessToken,
  generateRefreshToken,
  getExpDate,
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
      const err = new Error("incorect username or password");
      err.name = "UnauthorizedError";
      return next(err);
    }

    const isvalid = await comparePasswords(req.body.password, user.password);

    if (!isvalid) {
      const err = new Error("incorect username or password ");
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
      message: "authentication successful",
      account: { id: user.id, username: user.username, email: user.email },
      profile: {},
      exp: getExpDate(accessToken),
    });
    next();
  } catch (error) {
    if (!error?.name) {
      const err = new Error("token is invalide");
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
      const err = new Error("username has already been taken");
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

    try {
      await prisma.profile.create({
        data: {
          accountId: user.id,
        },
      });
    } catch (error) {
      await prisma.account.delete({
        where: { id: user.id },
      });
      const err = new Error("error in signup");
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
      account: { id: user.id, username: user.username },
      profile: {},
      exp: getExpDate(accessToken),
    });
    next();
  } catch (error) {
    const err = new Error("error in signup");
    err.name = "UnauthorizedError";
    return next(err);
  }
};

export const signout = async (req, res, next) => {
  try {
    if (req.body.accountId) {
      await prisma.token.deleteMany({
        where: {
          accountId: req.body.accountId,
        },
      });
    }
    res.clearCookie("access_token", { httpOnly: true });
    res.clearCookie("refresh_token", {
      httpOnly: true,
      path: "/auth/refresh",
    });
    res.status(200).json({
      status: "success",
      message: "user successfully signout.",
    });
    next();
  } catch (error) {
    const err = new Error("error in signout");
    err.name = "UnauthorizedError";
    return next(err);
  }
};
