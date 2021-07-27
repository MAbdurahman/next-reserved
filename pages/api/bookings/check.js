import nc from 'next-connect';
import connectDatabase from './../../../config/connectDatabase';

import { checkRoomBookingAvailability } from './../../../controllers/bookingControllers';

import onError from './../../../middlewares/errors';

const handler = nc({ onError });

connectDatabase();

handler.get(checkRoomBookingAvailability);

export default handler;
