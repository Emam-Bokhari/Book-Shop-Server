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
exports.UserServices = void 0;
const HttpError_1 = require('../../errors/HttpError');
const user_model_1 = require('./user.model');
const createUser = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const createdUser = yield user_model_1.User.create(payload);
    return createdUser;
  });
const getAllUsers = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find();
    if (users.length === 0) {
      throw new HttpError_1.HttpError(
        404,
        'No user record were found in the database',
      );
    }
    return users;
  });
const getUserById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
      throw new HttpError_1.HttpError(404, 'No user found with ID');
    }
    return user;
  });
const updateUserById = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield user_model_1.User.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { name: payload },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      throw new HttpError_1.HttpError(404, 'No user found with ID');
    }
    return updatedUser;
  });
const updateUserStatusById = (id, status) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const validStatuses = ['active', 'banned'];
    if (!validStatuses.includes(status)) {
      throw new HttpError_1.HttpError(400, `Invalid status: ${status}`);
    }
    const updatedStatus = yield user_model_1.User.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { status: status },
      { new: true, runValidators: true },
    );
    if (!updatedStatus) {
      throw new HttpError_1.HttpError(404, 'No user found with ID');
    }
    return updatedStatus;
  });
const deleteUserById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield user_model_1.User.findOneAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true },
    );
    if (!deletedUser) {
      throw new HttpError_1.HttpError(404, 'No user found with ID');
    }
    return deletedUser;
  });
exports.UserServices = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  updateUserStatusById,
  deleteUserById,
};
