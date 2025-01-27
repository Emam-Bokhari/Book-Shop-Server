import { asyncHandler } from '../../utils/global/asyncHandler';
import { sendResponse } from '../../utils/global/sendResponse';
import { ShippingAddressServices } from './shippingAddress.service';

const createShippingAddressController = asyncHandler(async (req, res) => {
  const shippingAddressPayload = req.body;
  const userEmail = req.user.email;
  const createdShippingAddress =
    await ShippingAddressServices.createShippingAddress(
      shippingAddressPayload,
      userEmail,
    );

  sendResponse(res, {
    success: true,
    message: 'Shipping address created successfully',
    statusCode: 201,
    data: createdShippingAddress,
  });
});

const getAllShippingAddressController = asyncHandler(async (req, res) => {
  const query = req.query;
  const shippingAddresses =
    await ShippingAddressServices.getAllShippingAddress(query);

  sendResponse(res, {
    success: true,
    message: 'Shipping addresses retrieved successfully',
    statusCode: 200,
    data: shippingAddresses,
  });
});

const getShippingAddressController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const shippingAddress =
    await ShippingAddressServices.getShippingAddressById(id);

  sendResponse(res, {
    success: true,
    message: 'Shipping address retrieved successfully',
    statusCode: 200,
    data: shippingAddress,
  });
});

const updatedShippingAddressController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updatedPayload = req.body;
  const updatedShippingAddress =
    await ShippingAddressServices.updateShippingAddressById(id, updatedPayload);

  sendResponse(res, {
    success: true,
    message: 'Shipping address updated successfully',
    statusCode: 200,
    data: updatedShippingAddress,
  });
});

const deleteShippingAddressController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await ShippingAddressServices.deleteShippingAddressById(id);

  sendResponse(res, {
    success: true,
    message: 'Shipping address deleted successfully',
    statusCode: 200,
    data: {},
  });
});

export const ShippingAddressControllers = {
  createShippingAddressController,
  getAllShippingAddressController,
  getShippingAddressController,
  updatedShippingAddressController,
  deleteShippingAddressController,
};
