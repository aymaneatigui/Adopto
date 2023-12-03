import { verifyToken } from "../utils/jwt";

const protect = async (req, res, next) => {
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    const err = new Error("token not found");
    err.name = "UnauthorizedError";
    return next(err);
  }

  try {
    const user = verifyToken(accessToken, process.env.JWT_ACCESS_SECRET);
    req.user = user;
    next();
  } catch (error) {
    const err = new Error("token is invalide");
    err.name = "UnauthorizedError";
    return next(err);
  }
};

export default protect;
