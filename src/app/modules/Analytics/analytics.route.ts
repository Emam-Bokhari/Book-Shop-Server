import express from "express";
import { AnalyticsControllers } from "./analytics.controller";

const router = express.Router();

router.get("/getStats", AnalyticsControllers.getStatsController)

export const AnalyticsRoutes = router;