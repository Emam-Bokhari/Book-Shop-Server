import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../utils/global/asyncHandler';
import { HttpError } from '../errors/HttpError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/User/user.model';
import { TUserRole } from '../modules/User/user.interface';

export const auth = (...requiredRoles: TUserRole[]) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const authHeader = req.headers.authorization;

      // // check if token is Bearer or not
      if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new HttpError(
          401,
          'Missing or invalid authorization header. Please ensure the request includes a valid Bearer token',
        );
      }

      const token = authHeader.split(' ')[1];

      // // check if no token
      if (!token) {
        throw new HttpError(
          401,
          'Access token is missing or invalid. Please provide a valid token to access this resource.',
        );
      }

      // // token verify
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
      // console.log(decoded)

      const { email, role } = decoded;


      // check if the user is exists
      const user = await User.isUserExists(email);
      if (!user) {
        throw new HttpError(
          404,
          ' Invalid credentials or session. Please try logging in again',
        );
      }

      // check if the user is already deleted
      if (user.isDeleted) {
        throw new HttpError(404, 'The user is already deleted');
      }

      // // check if the user is banned
      if (user.status === 'banned') {
        throw new HttpError(
          403,
          'Your account has been banned. Please contact support for assistance.',
        );
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new HttpError(
          403,
          'Access denied. Your role does not have the necessary permissions to perform this action.',
        );
      }

      req.user = decoded as JwtPayload;

      next();
    },
  );
};
