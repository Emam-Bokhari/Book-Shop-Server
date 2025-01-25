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

export const ShippingAddressServices = {
  createShippingAddress,
  getAllShippingAddress,
  getShippingAddressById,
};
