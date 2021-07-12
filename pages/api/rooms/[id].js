import nc from 'next-connect';
import connectDatabase from '../../../config/connectDatabase';
import { getSingleRoom } from '../../../controllers/roomControllers';

const handler = nc();

connectDatabase();

handler.get(getSingleRoom);


export default handler;
