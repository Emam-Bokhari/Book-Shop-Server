import { Document, Model, Types } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
  status?: 'active' | 'banned';
  image?: string;
  phone?: string;
  age?: string;
  gender?: 'male' | 'female';
  country?: string;
  city?: string;
  postalCode?: string;
  isDeleted?: false;
}

export type TUserRole = keyof typeof USER_ROLE;

export interface UserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
