import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../database/database";

export const verifyToken = (token, sercret) => {
  return jwt.verify(token, sercret);
};

export const generateAccessToken = (user) => {
  return jwt.sign(
    { accountId: user.id, username: user.username },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { accountId: user.id, username: user.username },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

export const refreshAccessToken = async (refreshToken) => {
  try {
    //Decod the Token
    const decodedToken = jwt.decode(refreshToken) as JwtPayload;

    //Search If the user of the Token exsit
    const user = await prisma.account.findUnique({
      where: {
        id: decodedToken.accountId,
      },
      include: {
        token: true,
      },
    });
    if (!user) {
      const err = new Error("Invalid refresh token user dont exsite");
      err.name = "UnauthorizedError";
      throw err;
    }

    //Check if the User Have this token
    const token = user.token.find(
      (token) => token.accountId === decodedToken.accountId
    );
    if (!token) {
      const err = new Error("Invalid refresh token token dont exsite");
      err.name = "UnauthorizedError";
      throw err;
    }

    //Generate and return a new Access token
    return generateAccessToken(user);
  } catch (error) {
    const err = new Error("Error in Refreshing Token");
    err.name = "UnauthorizedError";
    throw err;
  }
};

export const saveRefreshToken = async (refreshToken) => {
  try {
    //Decode the Token
    const decodedToken = jwt.decode(refreshToken) as JwtPayload;

    //Search if this user alrady have token
    const token = await prisma.token.findFirst({
      where: {
        accountId: decodedToken.accountId,
      },
    });

    //If Yes just update the token
    if (token) {
      await prisma.token.update({
        where: {
          id: token.id,
        },
        data: {
          value: refreshToken,
        },
      });
    } else {
      await prisma.token.create({
        data: {
          value: refreshToken,
          accountId: decodedToken.accountId,
        },
      });
    }
  } catch (error) {
    const err = new Error("Error in Saving Refresh Token");
    err.name = "UnauthorizedError";
    throw err;
  }
};

export const getExpDate = (token) => {
  const decodedToken = jwt.decode(token) as JwtPayload;
  return decodedToken.exp;
};
