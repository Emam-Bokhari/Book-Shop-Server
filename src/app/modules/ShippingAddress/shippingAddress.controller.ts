import { asyncHandler } from '../../utils/global/asyncHandler';
import { sendResponse } from '../../utils/global/sendResponse';
import { ShippingAddressServices } from './shippingAddress.service';

const createShippingAddressController = asyncHandler(async (req, res) => {
  const shippingAddressPayload = req.body;
  const createdShippingAddress =
    await ShippingAddressServices.createShippingAddress(shippingAddressPayload);

  sendResponse(res, {
    success: true,
    message: 'Shipping address created successfully',
    statusCode: 201,
    data: createdShippingAddress,
  });
});

export const ShippingAddressControllers = {
  createShippingAddressController,
};
