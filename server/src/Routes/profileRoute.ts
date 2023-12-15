import { Router } from "express";
import { updateProfile } from "../middleware/updateProfile";

const profileRoute = Router();

profileRoute.put("/profile", updateProfile);

export default profileRoute;
