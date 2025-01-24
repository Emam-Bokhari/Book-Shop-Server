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

const updateUserStatusById = async (id: string, status: string) => {
    const validStatuses = ["active", "banned"];

    if (!validStatuses.includes(status)) {
        throw new Error(`Invalid status: ${status}`)
    }

    const updatedStatus = await User.findOneAndUpdate({ _id: id, isDeleted: false }, { status: status }, { new: true, runValidators: true })

    if (!updatedStatus) {
        throw new Error("No user found with ID")
    }

    return updatedStatus;

}

const deleteUserById = async (id: string) => {
    const deletedUser = await User.findOneAndUpdate({ _id: id }, { isDeleted: true }, { new: true })

    if (!deletedUser) {
        throw new Error("No user found with ID")
    };

    return deletedUser;
}

export const UserServices = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    updateUserStatusById,
    deleteUserById,
}

