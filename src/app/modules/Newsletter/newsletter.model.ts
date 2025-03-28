import { model, Schema } from 'mongoose';
import { TNewsletter } from './newsletter.interface';
import { excludeDeletedAggregation, excludeDeletedQuery } from '../../utils/moduleSpecific/queryFilters';


const newsletterSchema = new Schema<TNewsletter>(
    {
        email: {
            type: String,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

// query middleware for soft delete by utils
newsletterSchema.pre('find', excludeDeletedQuery);
newsletterSchema.pre('findOne', excludeDeletedQuery);

// aggregate middleware for soft delete by utils
newsletterSchema.pre('aggregate', excludeDeletedAggregation);

export const Newsletter = model<TNewsletter>('Newsletter', newsletterSchema);