import { model, Schema } from 'mongoose';

import {
    excludeDeletedAggregation,
    excludeDeletedQuery,
} from '../../utils/moduleSpecific/queryFilters';
import { TContact } from './contact.interface';

const contactSchema = new Schema<TContact>(
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

        message: {
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
contactSchema.pre('find', excludeDeletedQuery);
contactSchema.pre('findOne', excludeDeletedQuery);

// aggregate middleware for soft delete by utils
contactSchema.pre('aggregate', excludeDeletedAggregation);

export const Contact = model<TContact>('Contact', contactSchema);