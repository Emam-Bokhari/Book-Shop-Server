import { Types } from "mongoose";

export type TShippingAddress = {
    name: string;
    phone: string;
    address: string;
    postalCode: string;
}



export type TOrder = {
    userId: Types.ObjectId;
    products: Types.ObjectId;
    quantity: number;
    totalAmount?: number;
    paymentMethod: "sslCommerz" | "cashOnDelivery";
    paymentStatus: "pending" | "completed" | "failed";
    shippingAddress?: TShippingAddress;
    status: "pending" | "shipping" | "delivered" | "cancelled"
    orderDate?: Date;
}