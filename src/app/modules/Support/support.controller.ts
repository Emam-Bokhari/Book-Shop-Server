import { asyncHandler } from '../../utils/global/asyncHandler';
import { sendResponse } from '../../utils/global/sendResponse';
import { SupportServices } from './support.service';


const createSupportController = asyncHandler(async (req, res) => {
    const supportPayload = req.body;
    const createdSupport = await SupportServices.createSupport(supportPayload);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Support is created successfully',
        data: createdSupport,
    });
});

const getAllSupportsController = asyncHandler(async (req, res) => {
    const supports = await SupportServices.getAllSupports();

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Supports are retrieved successfully',
        data: supports,
    });
});

const getSupportController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const support = await SupportServices.getSupportById(id);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Support is retrieved successfully',
        data: support,
    });
});

const deleteSupportController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    await SupportServices.deleteSupportById(id);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Support is deleted successfully',
        data: {},
    });
});

export const SupportControllers = {
    createSupportController,
    getAllSupportsController,
    getSupportController,
    deleteSupportController,
};