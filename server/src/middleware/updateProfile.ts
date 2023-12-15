import prisma from "../database/database";

export const updateProfile = async (req, res, next) => {
  try {
    await prisma.profile.update({
      where: { id: "Profile ID" },
      data: req.body,
    });
    next();
  } catch (error) {
    return next(error);
  }
};
