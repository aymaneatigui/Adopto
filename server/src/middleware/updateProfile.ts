import prisma from "../database/database";
import { convertImageToBinary, toBase64 } from "../utils/img";

export const updateProfile = async (req, res, next) => {
  try {
    let data = { ...req.body };

    if (req?.file) {
      const imageBinary = await convertImageToBinary(req.file?.path);
      data.picture = imageBinary;
    }

    const user = await prisma.profile.update({
      where: {
        accountId: req.user.accountId,
      },
      data: data,
      include: {
        account: true,
      },
    });
    const account = user.account;
    const { account: _, ...profile } = user;

    res.status(200).json({
      status: "success",
      message: "Account updated successfully.",
      account: account,
      profile: {
        ...profile,
        picture: profile.picture ? toBase64(profile.picture) : null,
      },
    });
    next();
  } catch (error) {
    const err = new Error("error in update");
    err.name = "UnauthorizedError";
    return next(err);
  }
};
