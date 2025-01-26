import { Types } from 'mongoose';

export type TShippingAddressDetails = {
  name: 'home' | 'office' | 'other';
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
};

export type TOrder = {
  userId?: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
  totalAmount?: number;
  paymentMethod: 'sslCommerz' | 'cashOnDelivery';
  paymentStatus?: 'pending' | 'completed' | 'failed' | "canceled";
  shippingAddress?: Types.ObjectId;
  shippingAddressDetails?: TShippingAddressDetails;
  status: 'pending' | 'shipping' | 'delivered';
  orderDate?: Date;
  transactionId?: string;
};
