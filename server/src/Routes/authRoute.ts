import { Router } from "express";
import { signin, signout, signup } from "../middleware/authentication";
import { inputErrors } from "../errors/inputErrors";
import { authRule } from "../middleware/validationRules";
import { refreshToken } from "../middleware/refreshToken";

const authRoute = Router();

authRoute.post("/signin", authRule(), inputErrors, signin);
authRoute.post("/signup", authRule(), inputErrors, signup);
authRoute.post("/signout", signout);

authRoute.post("/refresh", refreshToken)

export default authRoute;