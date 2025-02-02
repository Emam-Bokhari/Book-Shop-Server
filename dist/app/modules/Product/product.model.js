"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const queryFilters_1 = require("../../utils/moduleSpecific/queryFilters");
const productSchema = new mongoose_1.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    category: {
        type: String,
        enum: {
            values: [
                'fiction',
                'nonFiction',
                'academic',
                'philosophy',
                'children',
                'science',
                'religion',
                'history',
            ],
            message: '{VALUE} is not valid category',
        },
        required: true,
    },
    author: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    price: {
        type: Number,
        trim: true,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        trim: true,
        required: true,
    },
    publishedDate: {
        type: Date,
        required: true,
    },
    edition: {
        type: String,
        trim: true,
    },
    language: {
        type: String,
        enum: {
            values: [
                'bengali',
                'english',
                'arabic',
                'hindi',
                'spanish',
                'french',
                'german',
            ],
            message: '{VALUE} is not a valid language',
        },
        required: true,
    },
    pages: {
        type: Number,
        trim: true,
    },
    rating: {
        type: Number,
        trim: true,
        required: true,
    },
    discount: {
        type: Number,
        trim: true,
    },
    format: {
        type: String,
        enum: {
            values: ['hardcover', 'paperback', 'eBook', 'audioBook'],
            message: '{VALUE} is not a valid format',
        },
        required: true,
    },
    quantity: {
        type: Number,
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
productSchema.pre('find', queryFilters_1.excludeDeletedQuery);
productSchema.pre('findOne', queryFilters_1.excludeDeletedQuery);
// aggregate middleware for soft delete by utils
productSchema.pre('aggregate', queryFilters_1.excludeDeletedAggregation);
exports.Product = (0, mongoose_1.model)('Product', productSchema);
