import nc from 'next-connect';
import connectDatabase from './../../config/connectDatabase';
import { webhookCheckout } from './../../controllers/paymentControllers';
import onError from './../../middlewares/errors';

const handler = nc({ onError });

connectDatabase();

export const config = {
	api: {
		bodyParser: false,
	},
};

handler.post(webhookCheckout);

export default handler;
