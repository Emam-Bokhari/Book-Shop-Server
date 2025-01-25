import { asyncHandler } from "../../utils/global/asyncHandler";
import { sendResponse } from "../../utils/global/sendResponse";
import { OrderServices } from "./order.service";

const createOrder = asyncHandler(async (req, res) => {
    const orderPayload = req.body;
    const createdOrder = await OrderServices.createOrder(orderPayload);

    sendResponse(res, {
        success: true,
        message: "Order created successfully",
        statusCode: 201,
        data: createdOrder,
    })
})

export const OrderControllers = {
    createOrder,
}