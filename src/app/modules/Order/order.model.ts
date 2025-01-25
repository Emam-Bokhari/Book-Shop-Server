import { model, Schema } from "mongoose";
import { TOrder, TShippingAddressDetails } from "./order.interface";

const shippingAddressDetailsSchema = new Schema<TShippingAddressDetails>({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    phone: {
        type: String,
        trim: true,
        required: true,
    },
    address: {
        type: String,
        trim: true,
        required: true,
    },
    postalCode: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
        required: true,
    },
    country: {
        type: String,
        trim: true,
        required: true,
    }
})

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
        // ref:"ShippingAddress",
    },
    shippingAddressDetails: {
        type: shippingAddressDetailsSchema,
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
        default: Date.now
    },

},
    {
        timestamps: true,
        versionKey: false
    }
);

export const Order = model<TOrder>("Order", orderSchema);