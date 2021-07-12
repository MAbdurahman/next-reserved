import nc from 'next-connect';
import connectDatabase from '../../../config/connectDatabase';
import { getSingleRoom, updateRoom, deleteRoom } from '../../../controllers/roomControllers';

const handler = nc();

connectDatabase();

handler.get(getSingleRoom);
handler.put(updateRoom);
handler.delete(deleteRoom);


export default handler;
