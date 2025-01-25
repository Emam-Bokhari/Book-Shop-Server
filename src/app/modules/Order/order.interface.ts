import { Types } from "mongoose";

export type TShippingAddressDetails = {
    name: string;
    phone: string;
    address: string;
    postalCode?: string;
    city: string;
    country: string;
}

export type TOrder = {
    userId?: Types.ObjectId;
    product: Types.ObjectId;
    quantity: number;
    totalAmount: number;
    paymentMethod: "sslCommerz" | "cashOnDelivery";
    paymentStatus?: "pending" | "completed" | "failed";
    shippingAddress?: Types.ObjectId;
    shippingAddressDetails?: TShippingAddressDetails;
    status: "pending" | "shipping" | "delivered" | "cancelled"
    orderDate?: Date;
}