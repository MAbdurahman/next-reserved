import nc from "next-connect";
import connectDatabase from "../../../config/connectDatabase";
import {allRooms, newRoom} from "../../../controllers/roomControllers";
import onError from '../../../middlewares/errors';

const handler = nc({ onError });

connectDatabase();

handler.get(allRooms);

handler.post(newRoom);

export default handler;