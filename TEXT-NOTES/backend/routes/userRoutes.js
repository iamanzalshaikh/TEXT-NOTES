import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getCurrentUser } from "../controllers/userController.js";



const userRoutes = express.Router();

userRoutes.get("/getCurrentuser", isAuth, getCurrentUser);

// Admin

export default userRoutes;
