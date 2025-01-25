import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>({
    userId: {
        type: Schema.Types.ObjectId,
    },
    product: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: {
            values: ["sslCommerz", "cashOnDelivery"],
            message: "{VALUE} is not a valid payment method"
        },
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: {
            values: ["pending", "completed", "failed"],
            message: "{VALUE} is not a valid payment status"
        },
        default: "pending",
    },
    shippingAddress: {
        type: Schema.Types.ObjectId,
    },
    status: {
        type: String,
        enum: {
            values: ["pending", "shipping", "delivered", "cancelled"],
            message: "{VALUE} is not a valid status"
        },
        default: "pending",
    },
    orderDate: {
        type: Date,
    },

},
    {
        timestamps: true,
        versionKey: false
    }
);

export const Order = model<TOrder>("Order", orderSchema);