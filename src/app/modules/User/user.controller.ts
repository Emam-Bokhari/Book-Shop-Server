import { UserServices } from "./user.service";
import { asyncHandler } from "../../helpers/asyncHandler";
import { sendResponse } from "../../helpers/sendResponse";

const createUserController = asyncHandler(async (req, res) => {
    const userPayload = req.body;
    const createdUser = UserServices.createUser(userPayload);

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

export const UserControllers = {
    createUserController,
    getAllUsersController,
    getUserController,
}