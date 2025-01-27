import QueryBuilder from '../../builder/QueryBuilder';
import { HttpError } from '../../errors/HttpError';
import { User } from '../User/user.model';
import { TShippingAddress } from './shippingAddress.interface';
import { ShippingAddress } from './shippingAddress.model';

const createShippingAddress = async (payload: TShippingAddress, userEmail: string) => {

  const user = await User.isUserExists(userEmail)

  // check if user is exists
  if (!user) {
    throw new HttpError(404, 'User not found.');
  }

  payload.userId = user._id;

  // check is default shipping address is exists
  const existingShippingAddress = await ShippingAddress.findOne({
    userId: user,
  });

  if (existingShippingAddress) {
    throw new HttpError(
      409,
      'A default shipping address already exists for this user.',
    );
  }

  const createdShippingAddress = await ShippingAddress.create(payload);

  return createdShippingAddress;
};

const getAllShippingAddress = async (query: Record<string, unknown>) => {

  const shippingAddressQuery = new QueryBuilder(ShippingAddress.find().populate("userId"), query).filter().sortBy().paginate()

  const shippingAddresses = await shippingAddressQuery.modelQuery;

  if (shippingAddresses.length === 0) {
    throw new HttpError(404, 'No shipping address were found in the database');
  }

  return shippingAddresses;
};

const getShippingAddressById = async (id: string) => {
  const shippingAddress = await ShippingAddress.findById(id).populate("userId");

  if (!shippingAddress) {
    throw new HttpError(404, 'No shipping address found with ID');
  }

  return shippingAddress;
};

const updateShippingAddressById = async (
  id: string,
  payload: Partial<TShippingAddress>,
) => {
  const updatedShippingAddress = await ShippingAddress.findOneAndUpdate(
    { _id: id, isDeleted: false },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedShippingAddress) {
    throw new HttpError(404, 'No shipping address found with ID');
  }

  return updatedShippingAddress;
};

const deleteShippingAddressById = async (id: string) => {
  const deletedShippingAddress = await ShippingAddress.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true },
  );

  if (!deletedShippingAddress) {
    throw new HttpError(404, 'No shipping address found with ID');
  }

  return deletedShippingAddress;
};

export const ShippingAddressServices = {
  createShippingAddress,
  getAllShippingAddress,
  getShippingAddressById,
  updateShippingAddressById,
  deleteShippingAddressById,
};
