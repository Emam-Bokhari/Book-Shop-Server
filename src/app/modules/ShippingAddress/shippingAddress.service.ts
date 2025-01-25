import { HttpError } from '../../errors/HttpError';
import { TShippingAddress } from './shippingAddress.interface';
import { ShippingAddress } from './shippingAddress.model';

const createShippingAddress = async (payload: TShippingAddress) => {
  const createdShippingAddress = await ShippingAddress.create(payload);

  return createdShippingAddress;
};

const getAllShippingAddress = async () => {
  const shippingAddresses = await ShippingAddress.find();

  if (shippingAddresses.length === 0) {
    throw new HttpError(404, "No shipping address were found in the database")
  };

  return shippingAddresses;
}

const getShippingAddressById = async (id: string) => {
  const shippingAddress = await ShippingAddress.findById(id);

  if (!shippingAddress) {
    throw new HttpError(404, "No shipping address found with ID")
  };

  return shippingAddress;

}

const updateShippingAddressById = async (id: string, payload: Partial<TShippingAddress>) => {
  const updatedShippingAddress = await ShippingAddress.findOneAndUpdate({ _id: id, isDeleted: false }, payload, { new: true, runValidators: true });

  if (!updatedShippingAddress) {
    throw new HttpError(404, "No shipping address found with ID")
  };

  return updatedShippingAddress;
}

export const ShippingAddressServices = {
  createShippingAddress,
  getAllShippingAddress,
  getShippingAddressById,
  updateShippingAddressById,
};
