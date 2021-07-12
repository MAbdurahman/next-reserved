import nc from "next-connect";
import connectDatabase from "../../../config/connectDatabase";
import {allRooms, newRoom} from "../../../controllers/roomControllers";

const handler = nc();

connectDatabase();

handler.get(allRooms);

handler.post(newRoom);

export default handler;