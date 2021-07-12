import nc from 'next-connect';
import connectDatabase from '../../../config/connectDatabase';
import { getSingleRoom, updateRoom, deleteRoom } from '../../../controllers/roomControllers';
import onError from "../../../middlewares/errors";

const handler = nc({ onError });

connectDatabase();

handler.get(getSingleRoom);
handler.put(updateRoom);
handler.delete(deleteRoom);


export default handler;
