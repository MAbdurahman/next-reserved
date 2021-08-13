import nc from "next-connect";
import connectDatabase from "../../../config/connectDatabase";
import {allRooms, newRoom} from "../../../controllers/roomControllers";
import onError from '../../../middlewares/errors';
import { isAuthenticatedUser, authorizeRoles } from "./../../../middlewares/auth";

const handler = nc({ onError });

connectDatabase();

handler.get(allRooms);

handler.use(isAuthenticatedUser, authorizeRoles('admin')).post(newRoom);

export default handler;