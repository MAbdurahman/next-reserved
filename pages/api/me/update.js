import nc from 'next-connect';
import connectDatabase from './../../../config/connectDatabase';

import { updateProfile } from './../../../controllers/authControllers';

import { isAuthenticatedUser } from './../../../middlewares/auth';
import onError from './../../../middlewares/errors';

const handler = nc({ onError });

connectDatabase();

handler.use(isAuthenticatedUser).put(updateProfile);

export default handler;
