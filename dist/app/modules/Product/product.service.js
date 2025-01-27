'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProductServices = void 0;
const QueryBuilder_1 = __importDefault(require('../../builder/QueryBuilder'));
const HttpError_1 = require('../../errors/HttpError');
const product_model_1 = require('./product.model');
const product_utils_1 = require('./product.utils');
const createProduct = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const createdProduct = yield product_model_1.Product.create(payload);
    return createdProduct;
  });
const getAllProducts = (query) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.default(
      product_model_1.Product.find(),
      query,
    )
      .search(product_utils_1.searchableFields)
      .filter()
      .sortBy()
      .paginate();
    const products = yield productQuery.modelQuery;
    if (products.length === 0) {
      throw new HttpError_1.HttpError(
        404,
        'No product were found in the database',
      );
    }
    return products;
  });
const getProductById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(id);
    if (!product) {
      throw new HttpError_1.HttpError(404, 'No product found with ID');
    }
    return product;
  });
const updateProductById = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const updatedProduct = yield product_model_1.Product.findOneAndUpdate(
      { _id: id, isDeleted: false },
      payload,
      { new: true, runValidators: true },
    );
    if (!updatedProduct) {
      throw new HttpError_1.HttpError(404, 'No product found with ID');
    }
    return updatedProduct;
  });
const deleteProductById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const deletedProduct = yield product_model_1.Product.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true },
    );
    if (!deletedProduct) {
      throw new HttpError_1.HttpError(404, 'No product found with ID');
    }
    return deletedProduct;
  });
exports.ProductServices = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
