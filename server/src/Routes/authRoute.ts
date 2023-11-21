import { Router } from "express";
import { signin, signout, signup } from "../middleware/authentication";
import { inputErrors } from "../errors/inputErrors";
import { authRule } from "../middleware/validationRules";

const authRoute = Router();

authRoute.post("/signin", authRule(), inputErrors, signin);
authRoute.post("/signup", authRule(), inputErrors, signup);
authRoute.post("/signout", signout);

export default authRoute;
