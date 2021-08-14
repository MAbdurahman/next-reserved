import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailsReducer, newReviewReducer, checkReviewReducer, newRoomReducer, roomReducer} from "./roomReducers";
import {
	authReducer,
	userReducer,
	loadedUserReducer,
	forgotPasswordReducer,
} from './userReducers';
import { checkBookingReducer, bookedDatesReducer, bookingsReducer, bookingReducer, bookingDetailsReducer } from "./bookingReducers";




const reducers = combineReducers({
   allRooms: allRoomsReducer,
   newRoom: newRoomReducer,
   roomDetails: roomDetailsReducer,
   room: roomReducer,
   auth: authReducer,
   user: userReducer,
   loadedUser: loadedUserReducer,
   forgotPassword: forgotPasswordReducer,
   checkBooking: checkBookingReducer,
   bookedDates: bookedDatesReducer,
   bookings: bookingsReducer,
   booking: bookingReducer,
   bookingDetails: bookingDetailsReducer,
   newReview: newReviewReducer,
   checkReview: checkReviewReducer
   
})

export default reducers;