import QueryBuilder from '../../builder/QueryBuilder';
import { HttpError } from '../../errors/HttpError';
import { Product } from '../Product/product.model';
// import { ShippingAddress } from '../ShippingAddress/shippingAddress.model';
import { User } from '../User/user.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import { generateTransactionId } from './order.utils';
import { SSLCommerzService } from './sslcommerz.service';

type TOrderResponse = {
  createdOrder: TOrder;
  paymentUrl: string;
};

const createOrder = async (
  payload: TOrder,
  userEmail: string,
): Promise<TOrderResponse> => {
  const user = await User.isUserExists(userEmail);

  if (!user) throw new HttpError(404, 'User not found');
  if (user.status === 'banned')
    throw new HttpError(
      403,
      'Your account is banned. You cannot perform this action.',
    );

  payload.userId = user._id;

  if (!payload.products || payload.products.length === 0) {
    throw new HttpError(400, 'At least one product is required.');
  }

  const productIds = payload.products.map((item) => item.productId);
  const products = await Product.find({ _id: { $in: productIds } });

  if (products.length !== payload.products.length) {
    throw new HttpError(404, 'One or more products not found.');
  }

  let totalAmount = 0;

  for (const item of payload.products) {
    const product = products.find(
      (p) => p._id.toString() === item.productId.toString(),
    );
    if (!product)
      throw new HttpError(404, `Product with ID ${item.productId} not found.`);
    if (product.quantity <= 0)
      throw new HttpError(400, `Product "${product.title}" is out of stock.`);
    if (item.quantity > product.quantity) {
      throw new HttpError(
        400,
        `Only ${product.quantity} units of "${product.title}" are available.`,
      );
    }

    totalAmount += product.price * item.quantity;
  }

  payload.totalAmount = totalAmount;

  if (!payload.shippingAddressDetails) {
    throw new HttpError(400, 'Shipping address is required.');
  }

  const finalShippingAddress = payload.shippingAddressDetails;

  // SSLCommerz Payment Handling
  const transactionId = generateTransactionId();

  try {
    const paymentResponse = await SSLCommerzService.initiatePayment({
      total_amount: totalAmount,
      currency: 'USD',
      tran_id: transactionId,
      success_url: `http://localhost:5000/api/v1/payments/payment-success/${transactionId}`,
      fail_url: `http://localhost:5000/api/v1/payments/payment-fail/${transactionId}`,
      cancel_url: `http:localhost:5000/api/v1/payments/payment-cancel/${transactionId}`,
      shipping_method: 'Courier',
      product_name: products.map((p) => p.title).join(', '),
      product_category: products.map((p) => p.category).join(', '),
      product_profile: 'general',
      cus_name: user.name || 'Unknown',
      cus_email: user.email || 'customer@example.com',
      cus_add1: finalShippingAddress.address || '',
      cus_city: finalShippingAddress.city || '',
      cus_postcode: finalShippingAddress.postalCode || '',
      cus_country: finalShippingAddress.country || '',
      cus_phone: finalShippingAddress.phone || '',
      ship_name: user.name || 'Unknown',
      ship_add1: finalShippingAddress.address || '',
      ship_city: finalShippingAddress.city || '',
      ship_postcode: finalShippingAddress.postalCode || '',
      ship_country: finalShippingAddress.country || '',
    });

    payload.transactionId = transactionId;

    const createdOrder = await Order.create({
      ...payload,
      shippingAddressDetails: finalShippingAddress,
    });

    // Decrease product quantity
    for (const item of payload.products) {
      await Product.findOneAndUpdate(
        { _id: item.productId },
        { $inc: { quantity: -item.quantity } },
      );
    }

    return {
      createdOrder,
      paymentUrl: paymentResponse,
    };
  } catch (err) {
    throw new HttpError(500, 'Failed to initiate payment.');
  }
};

const getAllOrders = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(
    Order.find().populate('userId').populate('products.productId'),
    query,
  )
    .filter()
    .sortBy()
    .paginate();

  const meta = await orderQuery.countTotal();
  const result = await orderQuery.modelQuery;

  // const orders = await orderQuery.modelQuery;

  if (result.length === 0) {
    throw new HttpError(404, 'No order were found in the database');
  }

  return {
    meta,
    result,
  };
};

const getOrderById = async (id: string) => {
  const order = await Order.findById(id)
    .populate('userId')
    .populate('products.productId');

  if (!order) {
    throw new HttpError(404, 'No order found with ID');
  }

  return order;
};

const getOrderHistoryBySpecificUser = async (userEmail: string) => {
  const user = await User.isUserExists(userEmail);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  const orders = await Order.find({ userId: user._id }).populate(
    'userId',
    '_id name identifier role',
  );

  if (orders.length === 0) {
    throw new HttpError(404, 'No order history were found provide this user ID');
  }

  return orders;
};

const updateOrderStatusById = async (id: string, status: string) => {
  const validStatuses = ['pending', 'shipping', 'delivered', 'cancelled'];

  if (!validStatuses.includes(status)) {
    throw new HttpError(400, `Invalid status: ${status}`);
  }

  const updatedStatus = await Order.findOneAndUpdate(
    { _id: id },
    { status: status },
    { new: true, runValidators: true },
  );

  if (!updatedStatus) {
    throw new HttpError(404, 'No order found with ID');
  }

  return updatedStatus;
};

export const OrderServices = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderHistoryBySpecificUser,
  updateOrderStatusById,
};
