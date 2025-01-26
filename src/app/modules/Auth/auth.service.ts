import config from "../../config";
import { HttpError } from "../../errors/HttpError";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";

const loginUser = async (payload: TLoginUser) => {
    const user = await User.isUserExists(payload.email)
    if (!user) {
        throw new HttpError(404, "User not found")
    }

    // check if user is already deleted
    if (user.isDeleted) {
        throw new HttpError(404, "The user is already deleted")
    }

    // check if user is already banned
    if (user.status === "banned") {
        throw new HttpError(403, "The user account is banned.")
    }

    // check if user password is matched
    if (!(await User.isPasswordMatched(payload?.password, user.password))) {
        throw new HttpError(401, "Incorrect password")
    }

    // create jwt token

    const jwtPayload = {
        email: user?.email,
        role: user?.role,
    }

    const token = jwt.sign({
        jwtPayload
    }, config.jwt_access_secret as string, { expiresIn: "7d" });


    return {
        token
    }

}

export const AuthServices = {
    loginUser,
}