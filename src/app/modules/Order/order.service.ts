import { HttpError } from '../../errors/HttpError';
import { Product } from '../Product/product.model';
import { ShippingAddress } from '../ShippingAddress/shippingAddress.model';
import { TOrder, TShippingAddressDetails } from './order.interface';
import { Order } from './order.model';
import { generateTransactionId } from './order.utils';
import { SSLCommerzService } from './sslcommerz.service';


const createOrder = async (payload: TOrder) => {
  // TODO: check if user is exists
  // TODO: check if payment method ssl/cashOnDelivery
  // TODO: if payment method ssl, then check if payment status is confirmed
  // TODO: if payment method is ssl , then payment status update pending to confirmed
  // TODO: if payment is completed then, less product quantity

  const product = await Product.findOne({ _id: payload.product });

  // check if product is exists
  if (!product) {
    throw new HttpError(404, 'No product found with ID');
  }

  // check if product is available
  if (product.quantity <= 0) {
    throw new HttpError(
      400,
      'Product is currently unavailable. Please check back later or choose another product.',
    );
  }

  // total amount of product
  const totalAmount = product.price * payload.quantity;

  // console.log(totalAmount)

  // handle shipping address
  let finalShippingAddress: TShippingAddressDetails | null = null;

  if (!payload.shippingAddress && !payload.shippingAddressDetails) {
    throw new HttpError(400, 'Shipping address is required.');
  }

  if (payload.shippingAddress) {
    // check if default shipping address
    const defaultShippingAddress = await ShippingAddress.findOne({
      _id: payload.shippingAddress,
    });

    if (!defaultShippingAddress) {
      throw new HttpError(404, 'No default shipping address found with ID');
    }

    finalShippingAddress = {
      name: defaultShippingAddress.name,
      phone: defaultShippingAddress.phone,
      address: defaultShippingAddress.address,
      postalCode: defaultShippingAddress.postalCode,
      city: defaultShippingAddress.city,
      country: defaultShippingAddress.country,
    };
  } else if (payload.shippingAddressDetails) {
    finalShippingAddress = payload.shippingAddressDetails;
  }

  // payment method integration
  // if payment method is sslCommerz, initiate the payment
  if (payload.paymentMethod === "sslCommerz") {

    const transactionId = generateTransactionId();
    // console.log(transactionId)

    try {
      const paymentResponse = await SSLCommerzService.initiatePayment({
        total_amount: totalAmount,
        currency: 'BDT',
        tran_id: transactionId,
        success_url: 'https://yourdomain.com/api/payment/success',
        fail_url: 'https://yourdomain.com/api/payment/fail',
        cancel_url: 'https://yourdomain.com/api/payment/cancel',
        shipping_method: 'Courier',
        product_name: product.title,
        product_category: product.category,
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: finalShippingAddress?.address,
        cus_city: finalShippingAddress?.city,
        cus_postcode: finalShippingAddress?.postalCode,
        cus_country: finalShippingAddress?.country,
        cus_phone: finalShippingAddress?.phone,
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_city: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
      });

      payload.transactionId = transactionId

      return paymentResponse.GatewayPageURL;

    } catch (error) {
      throw new HttpError(500, 'Failed to initiate payment.');

    }

  }


  // create the order
  const createdOrder = await Order.create({
    ...payload,
    shippingAddressDetails: finalShippingAddress,
  });

  return null;
};

const getAllOrders = async () => {
  const orders = await Order.find();

  if (orders.length === 0) {
    throw new HttpError(404, 'No order were found in the database');
  }

  return orders;
};

const getOrderById = async (id: string) => {
  const order = await Order.findById(id);

  if (!order) {
    throw new HttpError(404, 'No order found with ID');
  }

  return order;
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
  updateOrderStatusById,
};
