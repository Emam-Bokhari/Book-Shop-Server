import { RequestHandler } from "express";
import { UserServices } from "./user.service";

const createUserController: RequestHandler = async (req, res) => {
    const userPayload = req.body;
    const createdUser = UserServices.createUser(userPayload);

    res.json({
        success: true,
        message: "User created successfully",
        statusCode: 201,
        data: createdUser
    })
}

export const UserControllers = {
    createUserController,
}