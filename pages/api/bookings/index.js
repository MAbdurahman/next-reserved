import nc from 'next-connect';
import connectDatabase from './../../../config/connectDatabase';

import { newBooking } from './../../../controllers/bookingControllers';

import { isAuthenticatedUser } from './../../../middlewares/auth';
import onError from './../../../middlewares/errors';

const handler = nc({ onError });

connectDatabase();

handler.use(isAuthenticatedUser).post(newBooking);

export default handler;
