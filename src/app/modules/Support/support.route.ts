import express from 'express';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
    '/',
    validateRequestSchema(ContactValidationSchema.createContactValidationSchema),
    ContactControllers.createContactController,
);

router.get(
    '/',
    auth(USER_ROLE.admin),
    ContactControllers.getAllContactsController,
);

router.get(
    '/:id',
    auth(USER_ROLE.admin),
    ContactControllers.getContactController,
);

router.delete(
    '/:id',
    auth(USER_ROLE.admin),
    ContactControllers.deleteContactController,
);

export const ContactRoutes = router;