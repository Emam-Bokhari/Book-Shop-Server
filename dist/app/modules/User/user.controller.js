"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const asyncHandler_1 = require("../../utils/global/asyncHandler");
const sendResponse_1 = require("../../utils/global/sendResponse");
const createUserController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userPayload = req.body;
    const createdUser = yield user_service_1.UserServices.createUser(userPayload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'User created successfully',
        statusCode: 201,
        data: createdUser,
    });
}));
const getAllUsersController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_service_1.UserServices.getAllUsers();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Users retrieved successfully',
        statusCode: 200,
        data: users,
    });
}));
const getUserController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield user_service_1.UserServices.getUserById(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'User retrieved successfully',
        statusCode: 200,
        data: user,
    });
}));
const updateUserController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { name } = req.body;
    const updatedUser = yield user_service_1.UserServices.updateUserById(id, name);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'User update successfully',
        statusCode: 200,
        data: updatedUser,
    });
}));
const updateUserStatusController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { status } = req.body;
    const updatedStatus = yield user_service_1.UserServices.updateUserStatusById(id, status);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'User status update successfully',
        statusCode: 200,
        data: updatedStatus,
    });
}));
const deleteUserController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield user_service_1.UserServices.deleteUserById(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'User deleted successfully',
        statusCode: 200,
        data: {},
    });
}));
exports.UserControllers = {
    createUserController,
    getAllUsersController,
    getUserController,
    updateUserController,
    updateUserStatusController,
    deleteUserController,
};
