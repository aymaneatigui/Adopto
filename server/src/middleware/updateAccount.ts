import prisma from "../database/database";
import { generateAccessToken, generateRefreshToken, getExpDate, saveRefreshToken } from "../utils/jwt";

export const updateAccount = async (req, res, next) => {
  try {
    interface UpdateData {
      username?: string;
      email?: string;
    }

    let updateData: UpdateData = {};

    if (req.body.username) {
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
      updateData.username = req.body.username;
    }
    if (req.body.email) {
      const exsit = await prisma.account.findFirst({
        where: {
          email: req.body.email,
        },
      });
      if (exsit !== null) {
        const err = new Error("email has already been taken");
        err.name = "BadRequestError";
        return next(err);
      }
      updateData.email = req.body.email;
    }

    const user = await prisma.account.update({
      where: {
        id: req.user.accountId,
      },
      data: updateData,
    });

    console.log(user);

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
      message: "Account updated successfully.",
      account: { id: user.id, username: user.username, email: user.email },
      exp: getExpDate(accessToken),
    });
    next();
  } catch (error) {
    const err = new Error("error in update");
    err.name = "UnauthorizedError";
    return next(err);
  }
};
