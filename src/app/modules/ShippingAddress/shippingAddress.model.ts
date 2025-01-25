import { model, Schema } from "mongoose";

const shippingAddressSchema = new Schema({
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

export const ShippingAddress = model("ShippingAddress", shippingAddressSchema)