import nc from 'next-connect';
import connectDatabase from './../../../config/connectDatabase';
import { createRoomReview } from './../../../controllers/roomControllers';
import onError from './../../../middlewares/errors';
import { isAuthenticatedUser } from './../../../middlewares/auth';

const handler = nc({ onError });

connectDatabase();

handler.use(isAuthenticatedUser).put(createRoomReview);

export default handler;
