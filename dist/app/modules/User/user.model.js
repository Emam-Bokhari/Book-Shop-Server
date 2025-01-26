"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const queryFilters_1 = require("../../utils/moduleSpecific/queryFilters");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'admin'],
            message: '{VALUE} is not a valid role',
        },
        default: 'user',
    },
    status: {
        type: String,
        enum: {
            values: ['active', 'banned'],
            message: '{VALUE} is not a valid status',
        },
        default: 'active',
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
userSchema.pre('find', queryFilters_1.excludeDeletedQuery);
userSchema.pre('findOne', queryFilters_1.excludeDeletedQuery);
// aggregation middleware for soft delete by utils
userSchema.pre('aggregate', queryFilters_1.excludeDeletedAggregation);
exports.User = (0, mongoose_1.model)('User', userSchema);
