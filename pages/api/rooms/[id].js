import nc from 'next-connect';
import connectDatabase from '../../../config/connectDatabase';
import { getSingleRoom, updateRoom, deleteRoom } from '../../../controllers/roomControllers';
import onError from "../../../middlewares/errors";
import { isAuthenticatedUser, authorizeRoles } from "./../../../middlewares/auth";

const handler = nc({ onError });

connectDatabase();

handler.get(getSingleRoom);
handler.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateRoom);
handler.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteRoom);


export default handler;
