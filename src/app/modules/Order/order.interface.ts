import { Types } from "mongoose";

export type TOrder = {
    userId?: Types.ObjectId;
    product: Types.ObjectId;
    quantity: number;
    totalAmount: number;
    paymentMethod: "sslCommerz" | "cashOnDelivery";
    paymentStatus?: "pending" | "completed" | "failed";
    shippingAddress?: Types.ObjectId;
    status: "pending" | "shipping" | "delivered" | "cancelled"
    orderDate?: Date;
}