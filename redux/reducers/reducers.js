import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailsReducer } from "./roomReducers";
import {
	authReducer,
	userReducer,
	loadedUserReducer,
	forgotPasswordReducer,
} from './userReducers';
import { checkBookingReducer, bookedDatesReducer, bookingsReducer, bookingDetailsReducer } from "./bookingReducers";




const reducers = combineReducers({
   allRooms: allRoomsReducer,
   roomDetails: roomDetailsReducer,
   auth: authReducer,
   user: userReducer,
   loadedUser: loadedUserReducer,
   forgotPassword: forgotPasswordReducer,
   checkBooking: checkBookingReducer,
   bookedDates: bookedDatesReducer,
   bookings: bookingsReducer,
   bookingDetails: bookingDetailsReducer
   
})

export default reducers;