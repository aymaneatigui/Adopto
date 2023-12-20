import { getExpDate, refreshAccessToken, verifyToken } from "../utils/jwt";

export const refreshToken = async (req, res, next) => {
  try {
    if (!req.cookies.refresh_token) {
      const err = new Error("you must provide a refresh Token");
      err.name = "UnauthorizedError";
      return next(err);
    }

    const refreshToken = req.cookies.refresh_token;
    verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET);
    const accessToken = await refreshAccessToken(refreshToken);
    res.cookie("access_token", accessToken, { httpOnly: true });

    res.status(200).json({
      status: "success",
      message: "token refreshed",
      exp: getExpDate(accessToken),
    });
    next();
  } catch (error) {
    const err = new Error("invalide refreshtoken");
    err.name = "UnauthorizedError";
    return next(err);
  }
};

// export const googleRefreshToken =  async (req, res, next) => {
//   try {
//     if (!req.cookies.google_refresh_token) {
//       const err = new Error("you must provide a refresh Token");
//       err.name = "UnauthorizedError";
//       return next(err);
//     }

//     const refreshToken = req.cookies.google_refresh_token;
//     // verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET);
//     // const accessToken = await refreshAccessToken(refreshToken);

//     res.cookie("google_access_token", googleaccessToken, { httpOnly: true });

//     res.status(200).json({
//       status: "success",
//       message: "token refreshed",
//       exp: getExpDate(accessToken),
//     });
//     next();
//   } catch (error) {
//     const err = new Error("invalide refreshtoken");
//     err.name = "UnauthorizedError";
//     return next(err);
//   }
// };