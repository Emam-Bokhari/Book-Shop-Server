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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ShippingAddressServices = void 0;
const QueryBuilder_1 = __importDefault(require('../../builder/QueryBuilder'));
const HttpError_1 = require('../../errors/HttpError');
const user_model_1 = require('../User/user.model');
const shippingAddress_model_1 = require('./shippingAddress.model');
const createShippingAddress = (payload, userEmail) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(userEmail);
    // check if user is exists
    if (!user) {
      throw new HttpError_1.HttpError(404, 'User not found.');
    }
    payload.userId = user._id;
    // check is default shipping address is exists
    const existingShippingAddress =
      yield shippingAddress_model_1.ShippingAddress.findOne({
        userId: user,
      });
    if (existingShippingAddress) {
      throw new HttpError_1.HttpError(
        409,
        'A default shipping address already exists for this user.',
      );
    }
    const createdShippingAddress =
      yield shippingAddress_model_1.ShippingAddress.create(payload);
    return createdShippingAddress;
  });
const getAllShippingAddress = (query) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const shippingAddressQuery = new QueryBuilder_1.default(
      shippingAddress_model_1.ShippingAddress.find().populate('userId'),
      query,
    )
      .filter()
      .sortBy()
      .paginate();
    const shippingAddresses = yield shippingAddressQuery.modelQuery;
    if (shippingAddresses.length === 0) {
      throw new HttpError_1.HttpError(
        404,
        'No shipping address were found in the database',
      );
    }
    return shippingAddresses;
  });
const getShippingAddressById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const shippingAddress =
      yield shippingAddress_model_1.ShippingAddress.findById(id).populate(
        'userId',
      );
    if (!shippingAddress) {
      throw new HttpError_1.HttpError(404, 'No shipping address found with ID');
    }
    return shippingAddress;
  });
const updateShippingAddressById = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const updatedShippingAddress =
      yield shippingAddress_model_1.ShippingAddress.findOneAndUpdate(
        { _id: id, isDeleted: false },
        payload,
        { new: true, runValidators: true },
      );
    if (!updatedShippingAddress) {
      throw new HttpError_1.HttpError(404, 'No shipping address found with ID');
    }
    return updatedShippingAddress;
  });
const deleteShippingAddressById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const deletedShippingAddress =
      yield shippingAddress_model_1.ShippingAddress.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true },
      );
    if (!deletedShippingAddress) {
      throw new HttpError_1.HttpError(404, 'No shipping address found with ID');
    }
    return deletedShippingAddress;
  });
exports.ShippingAddressServices = {
  createShippingAddress,
  getAllShippingAddress,
  getShippingAddressById,
  updateShippingAddressById,
  deleteShippingAddressById,
};
