import nc from 'next-connect';
import connectDatabase from './../../../config/connectDatabase';
import { stripeCheckoutSession } from './../../../controllers/paymentControllers';
import { isAuthenticatedUser } from './../../../middlewares/auth';
import onError from './../../../middlewares/errors';

const handler = nc({ onError });

connectDatabase();

handler.use(isAuthenticatedUser).get(stripeCheckoutSession);

export default handler;
