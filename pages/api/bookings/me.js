import nc from 'next-connect';
import connectDatabase from './../../../config/connectDatabase';

import { myBookings } from './../../../controllers/bookingControllers';

import { isAuthenticatedUser } from './../../../middlewares/auth';
import onError from './../../../middlewares/errors';

const handler = nc({ onError });

connectDatabase();

handler.use(isAuthenticatedUser).get(myBookings);

export default handler;
