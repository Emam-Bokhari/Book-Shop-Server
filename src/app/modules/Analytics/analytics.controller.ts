import { asyncHandler } from "../../utils/global/asyncHandler";
import { sendResponse } from "../../utils/global/sendResponse";
import { AnalyticsServices } from "./analytics.service";

const getStatsController = asyncHandler(async (req, res) => {
    const stats = await AnalyticsServices.getStats();
    sendResponse(res, {
        success: true,
        message: "Stats data retrieved successfully",
        statusCode: 200,
        data: stats,
    })
})

export const AnalyticsControllers = {
    getStatsController,
}