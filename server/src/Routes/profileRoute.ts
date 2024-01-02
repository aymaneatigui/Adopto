import { Router } from "express";
import { updateAccount } from "../middleware/updateAccount";
import { updateProfile } from "../middleware/updateProfile";
import multer from "multer";

const profileRoute = Router();
const upload = multer({ dest: "uploads/" });

profileRoute.put("/account", updateAccount);
profileRoute.put("/profile", upload.single("picture"), updateProfile);

export default profileRoute;
