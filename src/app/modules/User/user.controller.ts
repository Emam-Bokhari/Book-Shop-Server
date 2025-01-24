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

export const UserControllers = {
    createUserController,
}