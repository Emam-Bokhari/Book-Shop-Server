import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: TUser) => {
    const createdUser = await User.create(payload);

    return createdUser;
};

const getAllUsers = async () => {
    const users = await User.find();

    if (users.length === 0) {
        throw new Error("No user record were found in the database")
    }

    return users;

}

const getUserById = async (id: string) => {
    const user = await User.findById(id);

    if (!user) {
        throw new Error("No user found with ID")
    }

    return user;
}

const updateUserById = async (id: string, payload: string) => {
    const updatedUser = await User.findOneAndUpdate({ _id: id, isDeleted: false }, { name: payload }, { new: true, runValidators: true });

    if (!updatedUser) {
        throw new Error("No user found with ID")
    }

    return updatedUser
}

export const UserServices = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
}

