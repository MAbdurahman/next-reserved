import nc from 'next-connect';
import connectDatabase from './../../../config/connectDatabase';

import { getBookingDetails } from './../../../controllers/bookingControllers';

import { isAuthenticatedUser } from './../../../middlewares/auth';
import onError from './../../../middlewares/errors';

const handler = nc({ onError });

connectDatabase();

handler.use(isAuthenticatedUser).get(getBookingDetails);

export default handler;
