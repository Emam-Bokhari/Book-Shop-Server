import { HttpError } from "../../errors/HttpError";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payload: TProduct) => {

    const createdProduct = await Product.create(payload);

    return createdProduct;
};

const getAllProducts = async () => {
    const products = await Product.find();

    if (products.length === 0) {
        throw new HttpError(404, "No product were found in the database")
    }

    return products;
}

const getProductById = async (id: string) => {
    const product = await Product.findById(id);

    if (!product) {
        throw new HttpError(404, "No product found with ID")
    }
    return product;
}

export const ProductServices = {
    createProduct,
    getAllProducts,
    getProductById,
}