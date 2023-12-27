import prisma from "../database/database";
import { toBase64 } from "../utils/img";
import {
  generateAccessToken,
  generateRefreshToken,
  getExpDate,
  saveRefreshToken,
} from "../utils/jwt";

export const updateProfile = async (req, res, next) => {
  try {
    const user = await prisma.profile.update({
      where: {
        accountId: req.user.accountId,
      },
      data: req.body,
      include: {
        account: true,
      },
    });
    const account = user.account;
    const { account: _, ...profile } = user;
    console.log(profile);
    console.log(account);
    res.status(200).json({
      status: "success",
      message: "Account updated successfully.",
      account: account,
      profile: {
        ...profile,
        picture: toBase64(profile.picture),
      },
    });
    next();
  } catch (error) {
    const err = new Error("error in update");
    err.name = "UnauthorizedError";
    return next(err);
  }
};
