import { model, Schema } from 'mongoose';

import {
    excludeDeletedAggregation,
    excludeDeletedQuery,
} from '../../utils/moduleSpecific/queryFilters';
import { TSupport } from './support.interface';


const supportSchema = new Schema<TSupport>(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        issueType: {
            type: String,
            trim: true,
            required: true,
        },
        issueDescription: {
            type: String,
            trim: true,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

// query middleware for soft delete by utils
supportSchema.pre('find', excludeDeletedQuery);
supportSchema.pre('findOne', excludeDeletedQuery);

// aggregate middleware for soft delete by utils
supportSchema.pre('aggregate', excludeDeletedAggregation);

export const Support = model<TSupport>('Support', supportSchema);