'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ShippingAddressControllers = void 0;
const asyncHandler_1 = require('../../utils/global/asyncHandler');
const sendResponse_1 = require('../../utils/global/sendResponse');
const shippingAddress_service_1 = require('./shippingAddress.service');
const createShippingAddressController = (0, asyncHandler_1.asyncHandler)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const shippingAddressPayload = req.body;
      const userEmail = req.user.email;
      const createdShippingAddress =
        yield shippingAddress_service_1.ShippingAddressServices.createShippingAddress(
          shippingAddressPayload,
          userEmail,
        );
      (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Shipping address created successfully',
        statusCode: 201,
        data: createdShippingAddress,
      });
    }),
);
const getAllShippingAddressController = (0, asyncHandler_1.asyncHandler)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const query = req.query;
      const shippingAddresses =
        yield shippingAddress_service_1.ShippingAddressServices.getAllShippingAddress(
          query,
        );
      (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Shipping addresses retrieved successfully',
        statusCode: 200,
        data: shippingAddresses,
      });
    }),
);
const getShippingAddressController = (0, asyncHandler_1.asyncHandler)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const id = req.params.id;
      const shippingAddress =
        yield shippingAddress_service_1.ShippingAddressServices.getShippingAddressById(
          id,
        );
      (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Shipping address retrieved successfully',
        statusCode: 200,
        data: shippingAddress,
      });
    }),
);
const updatedShippingAddressController = (0, asyncHandler_1.asyncHandler)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const id = req.params.id;
      const updatedPayload = req.body;
      const updatedShippingAddress =
        yield shippingAddress_service_1.ShippingAddressServices.updateShippingAddressById(
          id,
          updatedPayload,
        );
      (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Shipping address updated successfully',
        statusCode: 200,
        data: updatedShippingAddress,
      });
    }),
);
const deleteShippingAddressController = (0, asyncHandler_1.asyncHandler)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const id = req.params.id;
      yield shippingAddress_service_1.ShippingAddressServices.deleteShippingAddressById(
        id,
      );
      (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Shipping address deleted successfully',
        statusCode: 200,
        data: {},
      });
    }),
);
exports.ShippingAddressControllers = {
  createShippingAddressController,
  getAllShippingAddressController,
  getShippingAddressController,
  updatedShippingAddressController,
  deleteShippingAddressController,
};
