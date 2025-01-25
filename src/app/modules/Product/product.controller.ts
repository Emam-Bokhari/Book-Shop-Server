import { asyncHandler } from "../../utils/global/asyncHandler";
import { sendResponse } from "../../utils/global/sendResponse";
import { ProductServices } from "./product.service";

const createProductController = asyncHandler(async (req, res) => {
    const productPayload = req.body;
    const createdProduct = await ProductServices.createProduct(productPayload);

    sendResponse(res, {
        success: true,
        message: "Product created successfully",
        statusCode: 201,
        data: createdProduct,
    })
})

const getAllProductsController = asyncHandler(async (req, res) => {
    const products = await ProductServices.getAllProducts();

    sendResponse(res, {
        success: true,
        message: "Products retrieved successfully",
        statusCode: 200,
        data: products,
    })
})

export const ProductControllers = {
    createProductController,
    getAllProductsController,
}