import { Router } from "express";
import { signin, signout, signup } from "../middleware/authentication";
import { inputErrors } from "../errors/inputErrors";

const authRoute = Router();

authRoute.post("/signin", inputErrors, signin);
authRoute.post("/signup", inputErrors, signup);
authRoute.post("/signout", inputErrors, signout);

export default authRoute;
