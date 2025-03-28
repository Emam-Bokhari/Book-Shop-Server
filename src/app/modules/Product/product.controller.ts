import { asyncHandler } from '../../utils/global/asyncHandler';
import { sendResponse } from '../../utils/global/sendResponse';
import { ProductServices } from './product.service';

const createProductController = asyncHandler(async (req, res) => {
  const productPayload = req.body;
  const createdProduct = await ProductServices.createProduct(productPayload);

  sendResponse(res, {
    success: true,
    message: 'Product created successfully',
    statusCode: 201,
    data: createdProduct,
  });
});

const getAllProductsController = asyncHandler(async (req, res) => {
  const query = req.query;
  const result = await ProductServices.getAllProducts(query);

  sendResponse(res, {
    success: true,
    message: 'Products retrieved successfully',
    statusCode: 200,
    meta: result.meta,
    data: result.result,
  });
});

const getProductsNoDefaultPaginationController = asyncHandler(
  async (req, res) => {
    const products = await ProductServices.getProductsNoDefaultPagination();

    sendResponse(res, {
      success: true,
      message: 'Products retrieved successfully',
      statusCode: 200,
      data: products,
    });
  },
);

const getProductController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await ProductServices.getProductById(id);

  sendResponse(res, {
    success: true,
    message: 'Product retrieved successfully',
    statusCode: 200,
    data: product,
  });
});

const updateProductController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updatedPayload = req.body;
  const updatedProduct = await ProductServices.updateProductById(
    id,
    updatedPayload,
  );

  sendResponse(res, {
    success: true,
    message: 'Product updated successfully',
    statusCode: 200,
    data: updatedProduct,
  });
});

const deleteProductController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await ProductServices.deleteProductById(id);

  sendResponse(res, {
    success: true,
    message: 'Product deleted successfully',
    statusCode: 200,
    data: {},
  });
});

export const ProductControllers = {
  createProductController,
  getAllProductsController,
  getProductsNoDefaultPaginationController,
  getProductController,
  updateProductController,
  deleteProductController,
};
