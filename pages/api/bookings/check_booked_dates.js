import nc from 'next-connect';
import connectDatabase from './../../../config/connectDatabase';

import { checkBookedDatesOfRoom } from './../../../controllers/bookingControllers';

import onError from './../../../middlewares/errors';

const handler = nc({ onError });

connectDatabase();

handler.get(checkBookedDatesOfRoom);

export default handler;
