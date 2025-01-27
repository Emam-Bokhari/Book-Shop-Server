import config from '../../config';
import SSLCommerzPayment from 'sslcommerz-lts';
import { HttpError } from '../../errors/HttpError';
import { TPaymentResponse } from './order.interface';

const store_id = config.store_id;
const store_pass = config.store_pass;
const is_live = false; // true for live false for sandbox

const initiatePayment = async (paymentData: TPaymentResponse) => {
  const sslcz = new SSLCommerzPayment(store_id, store_pass, is_live);

  try {
    const apiResponse = await sslcz.init({
      ...paymentData,
      success_url: config.success_url,
      fail_url: config.fail_url,
      cancel_url: config.cancel_url,
    });
    return apiResponse.GatewayPageURL;
  } catch (error) {
    throw new HttpError(400, 'Failed to initiate payment');
  }
};

export const SSLCommerzService = {
  initiatePayment,
};
