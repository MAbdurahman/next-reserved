import nc from "next-connect";
import connectDatabase from "../../../config/connectDatabase";
import {allRooms} from "../../../controllers/roomControllers";

const handler = nc();

connectDatabase();

handler.get(allRooms);

export default handler;