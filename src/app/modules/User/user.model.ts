import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import {
  excludeDeletedAggregation,
  excludeDeletedQuery,
} from '../../utils/moduleSpecific/queryFilters';

const userSchema = new Schema<TUser>(
  {
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
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// query middleware for soft delete by utils
userSchema.pre('find', excludeDeletedQuery);
userSchema.pre('findOne', excludeDeletedQuery);

// aggregation middleware for soft delete by utils
userSchema.pre('aggregate', excludeDeletedAggregation);

export const User = model<TUser>('User', userSchema);
