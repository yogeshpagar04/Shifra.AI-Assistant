import express from "express";
import { isAuth } from "../Middleware/isAuth.js";
import { getCurrentUser } from "../Controllers/user.controller.js";

import { SaveAssistant } from "../Controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/current-user", isAuth, getCurrentUser);

userRouter.post("/save-assistant", isAuth, SaveAssistant);

export default userRouter;