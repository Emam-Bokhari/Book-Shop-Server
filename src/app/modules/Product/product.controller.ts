import { asyncHandler } from "../../utils/global/asyncHandler";
import { sendResponse } from "../../utils/global/sendResponse";
import { ProductServices } from "./product.service";

const createProduct = asyncHandler(async (req, res) => {
    const productPayload = req.body;
    const createdProduct = await ProductServices.createProduct(productPayload);

    sendResponse(res, {
        success: true,
        message: "Product created successfully",
        statusCode: 201,
        data: createdProduct,
    })
})

export const ProductControllers = {
    createProduct,
}