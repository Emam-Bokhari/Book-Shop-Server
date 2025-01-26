"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingAddress = void 0;
const mongoose_1 = require("mongoose");
const queryFilters_1 = require("../../utils/moduleSpecific/queryFilters");
const shippingAddressSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        enum: ['home', 'office', 'other'],
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
        required: true,
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
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    versionKey: false,
});
// query middleware for soft delete by utils
shippingAddressSchema.pre('find', queryFilters_1.excludeDeletedQuery);
shippingAddressSchema.pre('findOne', queryFilters_1.excludeDeletedQuery);
// aggregate middleware for soft delete by utils
shippingAddressSchema.pre('aggregate', queryFilters_1.excludeDeletedAggregation);
exports.ShippingAddress = (0, mongoose_1.model)('ShippingAddress', shippingAddressSchema);
