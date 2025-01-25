import { HttpError } from "../../errors/HttpError";
import { Product } from "../Product/product.model";
import { ShippingAddress } from "../ShippingAddress/shippingAddress.model";
import { TOrder, TShippingAddressDetails } from "./order.interface";
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
    let finalShippingAddress: TShippingAddressDetails | null = null;

    if (!payload.shippingAddress && !payload.shippingAddressDetails) {
        throw new HttpError(400, "Shipping address is required.")
    }

    if (payload.shippingAddress) {
        // check if default shipping address
        const defaultShippingAddress = await ShippingAddress.findOne({ _id: payload.shippingAddress })


        if (!defaultShippingAddress) {
            throw new HttpError(404, "No default shipping address found with ID");
        };

        finalShippingAddress = {
            name: defaultShippingAddress.name,
            phone: defaultShippingAddress.phone,
            address: defaultShippingAddress.address,
            postalCode: defaultShippingAddress.postalCode,
            city: defaultShippingAddress.city,
            country: defaultShippingAddress.country,
        }

    } else if (payload.shippingAddressDetails) {
        finalShippingAddress = payload.shippingAddressDetails
    }


    // create the order 
    const createdOrder = await Order.create({
        ...payload,
        shippingAddressDetails: finalShippingAddress,
    });

    return createdOrder;

}

const getAllOrders = async () => {
    const orders = await Order.find();

    if (orders.length === 0) {
        throw new HttpError(404, "No order were found in the database")
    }

    return orders;
}

const getOrderById = async (id: string) => {
    const order = await Order.findById(id);

    if (!order) {
        throw new HttpError(404, "No order found with ID")
    }

    return order;
}

export const OrderServices = {
    createOrder,
    getAllOrders,
    getOrderById,
}