import { asyncHandler } from '../../utils/global/asyncHandler';
import { sendResponse } from '../../utils/global/sendResponse';
import { NewsletterServices } from './newsletter.service';


const createNewsletterController = asyncHandler(async (req, res) => {
    const newsletterPayload = req.body;
    const createdNewsletter =
        await NewsletterServices.createNewsletter(newsletterPayload);
    sendResponse(res, {
        success: true,
        message: 'Newsletter is created successfully',
        statusCode: 201,
        data: createdNewsletter,
    });
});

const getAllNewslettersController = asyncHandler(async (req, res) => {
    const newsletters = await NewsletterServices.getAllNewsletters();
    sendResponse(res, {
        success: true,
        message: 'NewsLetters are retrieved successfully',
        statusCode: 200,
        data: newsletters,
    });
});

const deleteNewsletterController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    await NewsletterServices.deleteNewsletterById(id);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Newsletter is deleted successfully',
        data: {},
    });
});

export const NewsLetterControllers = {
    createNewsletterController,
    getAllNewslettersController,
    deleteNewsletterController,
};