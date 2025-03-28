import { HttpError } from '../../errors/HttpError';
import { TNewsletter } from './newsletter.interface';
import { Newsletter } from './newsletter.model';


const createNewsletter = async (payload: TNewsletter) => {
    const createdNewsletter = await Newsletter.create(payload);
    return createdNewsletter;
};

const getAllNewsletters = async () => {
    const newsletters = await Newsletter.find();
    if (newsletters.length === 0) {
        throw new HttpError(404, 'No newsletter record were found in the database');
    }
    return newsletters;
};

const deleteNewsletterById = async (id: string) => {
    const deletedNewsletter = await Newsletter.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true },
    );
    if (!deletedNewsletter) {
        throw new HttpError(404, 'The requested newsletter could not be found.');
    }

    return deletedNewsletter;
};

export const NewsLetterServices = {
    createNewsletter,
    getAllNewsletters,
    deleteNewsletterById,
};