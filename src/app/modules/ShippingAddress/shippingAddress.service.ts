import { TShippingAddress } from "./shippingAddress.interface";
import { ShippingAddress } from "./shippingAddress.model";

const createShippingAddress = async (payload: TShippingAddress) => {
    const createdShippingAddress = await ShippingAddress.create(payload);

    return createdShippingAddress;
};

export const ShippingAddressServices = {
    createShippingAddress,
}