import { HttpError } from '../../errors/HttpError';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: TUser) => {
  const createdUser = await User.create(payload);

  return createdUser;
};

const getAllUsers = async () => {
  const users = await User.find();

  if (users.length === 0) {
    throw new HttpError(404, 'No user record were found in the database');
  }

  return users;
};

const getUserById = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new HttpError(404, 'No user found with ID');
  }

  return user;
};

const updateUserById = async (id: string, payload: string) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { name: payload },
    { new: true, runValidators: true },
  );

  if (!updatedUser) {
    throw new HttpError(404, 'No user found with ID');
  }

  return updatedUser;
};

const updateUserStatusById = async (id: string, status: string) => {
  const validStatuses = ['active', 'banned'];

  if (!validStatuses.includes(status)) {
    throw new HttpError(400, `Invalid status: ${status}`);
  }

  const updatedStatus = await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { status: status },
    { new: true, runValidators: true },
  );

  if (!updatedStatus) {
    throw new HttpError(404, 'No user found with ID');
  }

  return updatedStatus;
};

const updateUserRoleById = async (id: string, role: string) => {
  const validRoles = ["user", "admin"];

  if (!validRoles.includes(role)) {
    throw new HttpError(400, `Invalid roles: ${role}`)
  };

  const updatedRole = await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { role: role },
    { new: true, runValidators: true }
  )

  if (!updatedRole) {
    throw new HttpError(404, "No user found with ID")
  }

  return updatedRole;

}

const deleteUserById = async (id: string) => {
  const deletedUser = await User.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true },
  );

  if (!deletedUser) {
    throw new HttpError(404, 'No user found with ID');
  }

  return deletedUser;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  updateUserStatusById,
  updateUserRoleById,
  deleteUserById,
};
