import { model, Schema } from 'mongoose';
import { TShippingAddress } from './shippingAddress.interface';
import {
  excludeDeletedAggregation,
  excludeDeletedQuery,
} from '../../utils/moduleSpecific/queryFilters';

const shippingAddressSchema = new Schema<TShippingAddress>(
  {
    userId: {
      type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// query middleware for soft delete by utils
shippingAddressSchema.pre('find', excludeDeletedQuery);
shippingAddressSchema.pre('findOne', excludeDeletedQuery);

// aggregate middleware for soft delete by utils
shippingAddressSchema.pre('aggregate', excludeDeletedAggregation);

export const ShippingAddress = model('ShippingAddress', shippingAddressSchema);
