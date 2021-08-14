import nc from 'next-connect';
import connectDatabase from './../../../../config/connectDatabase';
import { allAdminUsers } from './../../../../controllers/authControllers';
import onError from './../../../../middlewares/errors';
import {
	isAuthenticatedUser,
	authorizeRoles,
} from './../../../../middlewares/auth';

const handler = nc({ onError });

connectDatabase();

handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(allAdminUsers);

export default handler;
