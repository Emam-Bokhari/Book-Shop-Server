import { asyncHandler } from '../../utils/global/asyncHandler';
import { sendResponse } from '../../utils/global/sendResponse';
import { AuthServices } from './auth.service';

const loginUserController = asyncHandler(async (req, res) => {
  const loginUserPayload = req.body;
  const loginResult = await AuthServices.loginUser(loginUserPayload);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User login successfully',
    data: loginResult,
  });
});

export const AuthControllers = {
  loginUserController,
};
