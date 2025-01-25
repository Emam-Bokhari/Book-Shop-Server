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

export const ShippingAddressServices = {
  createShippingAddress,
  getAllShippingAddress,
};
