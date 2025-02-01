import QueryBuilder from '../../builder/QueryBuilder';
import { HttpError } from '../../errors/HttpError';
import { User } from './user.model';

const getAllUsers = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query).filter().sortBy().paginate()
  // const users = await User.find();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  if (result.length === 0) {
    throw new HttpError(404, 'No user record were found in the database');
  }

  return {
    meta,
    result,
  };
};

const getUserById = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new HttpError(404, 'No user found with ID');
  }

  return user;
};

const updateUserById = async (id: string, name: string, userEmail: string) => {
  const user = await User.findOne({ _id: id, isDeleted: false });

  // check if user is exists
  if (!user) {
    throw new HttpError(404, 'No user found with ID');
  }

  // check if user is banned
  if (user.status === 'banned') {
    throw new HttpError(
      403,
      'Your account is banned. You cannot perform this action.',
    );
  }

  // check if the email of the logged-in user matches the user
  if (user.email !== userEmail) {
    throw new HttpError(403, 'You are not allowed to update this user');
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { name: name },
    { new: true, runValidators: true },
  );

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
  const validRoles = ['user', 'admin'];

  if (!validRoles.includes(role)) {
    throw new HttpError(400, `Invalid roles: ${role}`);
  }

  const user = await User.findOne({ _id: id, isDeleted: false });

  // check if user is exists
  if (!user) {
    throw new HttpError(404, 'No user found with ID');
  }

  // check if user is banned
  if (user.status === 'banned') {
    throw new HttpError(
      403,
      'The user is banned, You cannot update their role.',
    );
  }

  const updatedRole = await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { role: role },
    { new: true, runValidators: true },
  );

  return updatedRole;
};

const deleteUserById = async (id: string) => {
  const user = await User.findOne({ _id: id, isDeleted: false });

  // check if user is exists
  if (!user) {
    throw new HttpError(404, 'No user found with ID');
  }

  // check if user is banned
  if (user.status === 'banned') {
    throw new HttpError(
      403,
      'Your account is banned. You cannot perform this action.',
    );
  }

  const deletedUser = await User.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true },
  );

  return deletedUser;
};

export const UserServices = {
  getAllUsers,
  getUserById,
  updateUserById,
  updateUserStatusById,
  updateUserRoleById,
  deleteUserById,
};
