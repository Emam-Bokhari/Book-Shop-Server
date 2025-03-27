import { HttpError } from '../../errors/HttpError';
import { TSupport } from './support.interface';
import { Support } from './support.model';


const createSupport = async (payload: TSupport) => {
    const createdSupport = await Support.create(payload);
    return createdSupport;
};

const getAllSupports = async () => {
    const supports = await Support.find();

    if (supports.length === 0) {
        throw new HttpError(404, 'No support were found in the database');
    }

    return supports;
};

const getSupportById = async (id: string) => {
    const support = await Support.findById(id);

    if (!support) {
        throw new HttpError(404, 'The requested support could not be found.');
    }

    return support;
};

const deleteSupportById = async (id: string) => {
    const deletedSupport = await Support.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true },
    );
    if (!deletedSupport) {
        throw new HttpError(404, 'The requested support could not be found.');
    }

    return deletedSupport;
};

export const SupportServices = {
    createSupport,
    getAllSupports,
    getSupportById,
    deleteSupportById,
};