import nc from 'next-connect';
import connectDatabase from '../../../config/connectDatabase';
import { getSingleRoom, updateRoom, deleteRoom } from '../../../controllers/roomControllers';
import onError from "../../../middlewares/errors";
import { isAuthenticatedUser, authorizedRoles } from "./../../../middlewares/auth";

const handler = nc({ onError });

connectDatabase();

handler.get(getSingleRoom);
handler.use(isAuthenticatedUser, authorizedRoles('admin')).put(updateRoom);
handler.use(isAuthenticatedUser, authorizedRoles('admin')).delete(deleteRoom);


export default handler;
