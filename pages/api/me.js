import nc from 'next-connect';
import connectDatabase from "./../../config/connectDatabase";
import { currentUserProfile } from "./../../controllers/authControllers";
import { isAuthenticatedUser } from "./../../middlewares/auth";
import onError from "./../../middlewares/errors";


const handler = nc({ onError });

connectDatabase();

handler.use(isAuthenticatedUser).get(currentUserProfile);

export default handler;