import prisma from "../database/database";
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

    res.status(200);
    res.json({message : "you loged"})
    next()

  } catch (error) {
    const err = new Error("Error in sing-in");
    err.name = "UnauthorizedError";
    return next(err);
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

    const password = await hashPassword(req.body.password)
    const user = await prisma.account.create({
      data: {
        username : req.body.username,
        password : password,
      }
    })
    res.json({ user})
    next()
  } catch (error) {
    console.log(error)
    const err = new Error("Error in sign-up");
    err.name = "UnauthorizedError";
    return next(err);
  }

};
export const signout = (req, res, next) => {};
