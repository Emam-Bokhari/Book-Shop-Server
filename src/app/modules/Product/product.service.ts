import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payload: TProduct) => {

    const createdProduct = await Product.create(payload);

    return createdProduct;
};

export const ProductServices = {
    createProduct,
}