import { UserServices } from './user.service';
import { asyncHandler } from '../../utils/global/asyncHandler';
import { sendResponse } from '../../utils/global/sendResponse';



const getAllUsersController = asyncHandler(async (req, res) => {
  const users = await UserServices.getAllUsers();

  sendResponse(res, {
    success: true,
    message: 'Users retrieved successfully',
    statusCode: 200,
    data: users,
  });
});

const getUserController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await UserServices.getUserById(id);

  sendResponse(res, {
    success: true,
    message: 'User retrieved successfully',
    statusCode: 200,
    data: user,
  });
});

const updateUserController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  const updatedUser = await UserServices.updateUserById(id, name);

  sendResponse(res, {
    success: true,
    message: 'User update successfully',
    statusCode: 200,
    data: updatedUser,
  });
});

const updateUserStatusController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const updatedStatus = await UserServices.updateUserStatusById(id, status);

  sendResponse(res, {
    success: true,
    message: 'User status update successfully',
    statusCode: 200,
    data: updatedStatus,
  });
});

const updateUserRoleController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { role } = req.body;
  const updatedRole = await UserServices.updateUserRoleById(id, role);

  sendResponse(res, {
    success: true,
    message: 'User role update successfully',
    statusCode: 200,
    data: updatedRole,
  });
});

const deleteUserController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await UserServices.deleteUserById(id);

  sendResponse(res, {
    success: true,
    message: 'User deleted successfully',
    statusCode: 200,
    data: {},
  });
});

export const UserControllers = {
  getAllUsersController,
  getUserController,
  updateUserController,
  updateUserStatusController,
  updateUserRoleController,
  deleteUserController,
};
