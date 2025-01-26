import { asyncHandler } from '../../utils/global/asyncHandler';
import { sendResponse } from '../../utils/global/sendResponse';
import { OrderServices } from './order.service';
import { Document } from 'mongoose';

const createOrderController = asyncHandler(async (req, res) => {
  const orderPayload = req.body;
  const { createdOrder, paymentUrl } = await OrderServices.createOrder(orderPayload);


  const orderData = createdOrder instanceof Document ? createdOrder.toObject() : createdOrder;


  sendResponse(res, {
    success: true,
    message: 'Order created successfully',
    statusCode: 201,
    data: {
      ...orderData,
      paymentUrl,
    },
  });
});

const getAllOrdersController = asyncHandler(async (req, res) => {
  const orders = await OrderServices.getAllOrders();

  sendResponse(res, {
    success: true,
    message: 'Orders retrieved successfully',
    statusCode: 200,
    data: orders,
  });
});

const getOrderController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const order = await OrderServices.getOrderById(id);

  sendResponse(res, {
    success: true,
    message: 'Order retrieved successfully',
    statusCode: 200,
    data: order,
  });
});

const updateOrderStatusController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const updatedStatus = await OrderServices.updateOrderStatusById(id, status);

  sendResponse(res, {
    success: true,
    message: 'Order status updated successfully',
    statusCode: 200,
    data: updatedStatus,
  });
});

export const OrderControllers = {
  createOrderController,
  getAllOrdersController,
  getOrderController,
  updateOrderStatusController,
};
