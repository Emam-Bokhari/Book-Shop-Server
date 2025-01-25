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

const getAllShippingAddressController = asyncHandler(async (req, res) => {
  const shippingAddresses = await ShippingAddressServices.getAllShippingAddress();

  sendResponse(res, {
    success: true,
    message: "Shipping addresses retrieved successfully",
    statusCode: 200,
    data: shippingAddresses,
  })
})

const getShippingAddressController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const shippingAddress = await ShippingAddressServices.getShippingAddressById(id);

  sendResponse(res, {
    success: true,
    message: "Shipping address retrieved successfully",
    statusCode: 200,
    data: shippingAddress,
  })
})

const updatedShippingAddressController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updatedPayload = req.body;
  const updatedShippingAddress = await ShippingAddressServices.updateShippingAddressById(id, updatedPayload);

  sendResponse(res, {
    success: true,
    message: "Shipping address updated successfully",
    statusCode: 200,
    data: updatedShippingAddress,
  })
})

export const ShippingAddressControllers = {
  createShippingAddressController,
  getAllShippingAddressController,
  getShippingAddressController,
  updatedShippingAddress: updatedShippingAddressController,
};
