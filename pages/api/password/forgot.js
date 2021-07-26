import nc from 'next-connect';
import connectDatabase from './../../../config/connectDatabase';
import onError from './../../../middlewares/errors';
import { forgotPassword } from './../../../controllers/authControllers';


const handler = nc({ onError });

connectDatabase();

handler.post(forgotPassword);

export default handler;
