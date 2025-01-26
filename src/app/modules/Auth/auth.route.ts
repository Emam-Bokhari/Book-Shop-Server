import express from "express";
import { AuthControllers } from "./auth.controller";

const router = express.Router();

router.post("/login", AuthControllers.loginUserController)

export const AuthRoutes = router;