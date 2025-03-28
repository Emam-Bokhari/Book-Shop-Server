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
exports.UserServices = void 0;
const QueryBuilder_1 = __importDefault(require('../../builder/QueryBuilder'));
const HttpError_1 = require('../../errors/HttpError');
const user_model_1 = require('./user.model');
const getAllUsers = (query) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(
      user_model_1.User.find(),
      query,
    )
      .filter()
      .sortBy()
      .paginate();
    // const users = await User.find();
    const meta = yield userQuery.countTotal();
    const result = yield userQuery.modelQuery;
    if (result.length === 0) {
      throw new HttpError_1.HttpError(
        404,
        'No user record were found in the database',
      );
    }
    return {
      meta,
      result,
    };
  });
const getUserById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
      throw new HttpError_1.HttpError(404, 'No user found with ID');
    }
    return user;
  });
const updateUserById = (id, name, userEmail) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ _id: id, isDeleted: false });
    // check if user is exists
    if (!user) {
      throw new HttpError_1.HttpError(404, 'No user found with ID');
    }
    // check if user is banned
    if (user.status === 'banned') {
      throw new HttpError_1.HttpError(
        403,
        'Your account is banned. You cannot perform this action.',
      );
    }
    // check if the email of the logged-in user matches the user
    if (user.email !== userEmail) {
      throw new HttpError_1.HttpError(
        403,
        'You are not allowed to update this user',
      );
    }
    const updatedUser = yield user_model_1.User.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { name: name },
      { new: true, runValidators: true },
    );
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
const updateUserRoleById = (id, role) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const validRoles = ['user', 'admin'];
    if (!validRoles.includes(role)) {
      throw new HttpError_1.HttpError(400, `Invalid roles: ${role}`);
    }
    const user = yield user_model_1.User.findOne({ _id: id, isDeleted: false });
    // check if user is exists
    if (!user) {
      throw new HttpError_1.HttpError(404, 'No user found with ID');
    }
    // check if user is banned
    if (user.status === 'banned') {
      throw new HttpError_1.HttpError(
        403,
        'The user is banned, You cannot update their role.',
      );
    }
    const updatedRole = yield user_model_1.User.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { role: role },
      { new: true, runValidators: true },
    );
    return updatedRole;
  });
const deleteUserById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ _id: id, isDeleted: false });
    // check if user is exists
    if (!user) {
      throw new HttpError_1.HttpError(404, 'No user found with ID');
    }
    // check if user is banned
    if (user.status === 'banned') {
      throw new HttpError_1.HttpError(
        403,
        'Your account is banned. You cannot perform this action.',
      );
    }
    const deletedUser = yield user_model_1.User.findOneAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true },
    );
    return deletedUser;
  });
exports.UserServices = {
  getAllUsers,
  getUserById,
  updateUserById,
  updateUserStatusById,
  updateUserRoleById,
  deleteUserById,
};
