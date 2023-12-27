import { Router } from "express";
import { updateAccount } from "../middleware/updateAccount";
import { updateProfile } from "../middleware/updateProfile";

const profileRoute = Router();

profileRoute.put("/account", updateAccount);
profileRoute.put("/profile", updateProfile);

export default profileRoute;
