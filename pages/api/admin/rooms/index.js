import nc from 'next-connect';
import connectDatabase from './../../../../config/connectDatabase';
import { allAdminRooms } from './../../../../controllers/roomControllers';
import onError from './../../../../middlewares/errors';
import {
	isAuthenticatedUser,
	authorizeRoles,
} from './../../../../middlewares/auth';

const handler = nc({ onError });

connectDatabase();

handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(allAdminRooms);

export default handler;
