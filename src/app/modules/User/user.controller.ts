import { UserServices } from "./user.service";
import { asyncHandler } from "../../utils/global/asyncHandler";
import { sendResponse } from "../../utils/global/sendResponse";

const createUserController = asyncHandler(async (req, res) => {
    const userPayload = req.body;
    const createdUser = await UserServices.createUser(userPayload);

    sendResponse(res, {
        success: true,
        message: "User created successfully",
        statusCode: 201,
        data: createdUser
    })
})

const getAllUsersController = asyncHandler(async (req, res) => {
    const users = await UserServices.getAllUsers();

    sendResponse(res, {
        success: true,
        message: "Users retrieved successfully",
        statusCode: 200,
        data: users,
    })
})

const getUserController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await UserServices.getUserById(id);

    sendResponse(res, {
        success: true,
        message: "User retrieved successfully",
        statusCode: 200,
        data: user,
    })
})

const updateUserController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    const updatedUser = await UserServices.updateUserById(id, name);

    sendResponse(res, {
        success: true,
        message: "User update successfully",
        statusCode: 200,
        data: updatedUser,
    })
})

const updateUserStatusController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    const updatedStatus = await UserServices.updateUserStatusById(id, status);

    sendResponse(res, {
        success: true,
        message: "User status update successfully",
        statusCode: 200,
        data: updatedStatus
    })
})

const deleteUserController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    await UserServices.deleteUserById(id);

    sendResponse(res, {
        success: true,
        message: "User deleted successfully",
        statusCode: 200,
        data: {}
    })
})

export const UserControllers = {
    createUserController,
    getAllUsersController,
    getUserController,
    updateUserController,
    updateUserStatusController,
    deleteUserController,
}