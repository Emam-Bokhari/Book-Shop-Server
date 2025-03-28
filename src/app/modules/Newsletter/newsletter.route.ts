import express from 'express';
import { USER_ROLE } from '../User/user.constant';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { NewsletterValidationSchema } from './newsletter.validation';
import { NewsLetterControllers } from './newsletter.controller';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post(
    '/',
    validateRequestSchema(
        NewsletterValidationSchema.createNewsletterValidationSchema,
    ),
    NewsLetterControllers.createNewsletterController,
);

router.get(
    '/',
    auth(USER_ROLE.admin),
    NewsLetterControllers.getAllNewslettersController
);

router.delete(
    '/:id',
    auth(USER_ROLE.admin),
    NewsLetterControllers.deleteNewsletterController
);

export const NewsletterRoutes = router;