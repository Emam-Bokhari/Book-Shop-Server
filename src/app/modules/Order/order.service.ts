import { HttpError } from "../../errors/HttpError";
import { Product } from "../Product/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (payload: TOrder) => {
    // TODO: check if user is exists
    // TODO: check if payment method ssl/cashOnDelivery
    // TODO: if payment method ssl, then check if payment status is confirmed
    // TODO: if payment method is ssl , then payment status update pending to confirmed
    // TODO: if payment is completed then, less product quantity


    const product = await Product.findOne({ _id: payload.product });

    // check if product is exists
    if (!product) {
        throw new HttpError(404, "No product found with ID")
    }

    // check if product is available
    if (product.quantity <= 0) {
        throw new HttpError(400, "Product is currently unavailable. Please check back later or choose another product.")
    }

    // handle shipping address
    if (!payload.shippingAddress && !payload.shippingAddressDetails) {
        throw new HttpError(400, "Shipping address is required.")
    }

    // create the order 
    const createdOrder = await Order.create(payload);

    return createdOrder;

}

export const OrderServices = {
    createOrder,
}