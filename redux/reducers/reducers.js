import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailsReducer } from "./roomReducers";
import {
	authReducer,
	userReducer,
	loadedUserReducer,
	forgotPasswordReducer,
} from './userReducers';
import { checkBookingReducer } from "./bookingReducers";




const reducers = combineReducers({
   allRooms: allRoomsReducer,
   roomDetails: roomDetailsReducer,
   auth: authReducer,
   user: userReducer,
   loadedUser: loadedUserReducer,
   forgotPassword: forgotPasswordReducer,
   checkBooking: checkBookingReducer
})










export default reducers;