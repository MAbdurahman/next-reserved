import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailsReducer, newReviewReducer, checkReviewReducer, newRoomReducer } from "./roomReducers";
import {
	authReducer,
	userReducer,
	loadedUserReducer,
	forgotPasswordReducer,
} from './userReducers';
import { checkBookingReducer, bookedDatesReducer, bookingsReducer, bookingDetailsReducer } from "./bookingReducers";




const reducers = combineReducers({
   allRooms: allRoomsReducer,
   newRoom: newRoomReducer,
   roomDetails: roomDetailsReducer,
   auth: authReducer,
   user: userReducer,
   loadedUser: loadedUserReducer,
   forgotPassword: forgotPasswordReducer,
   checkBooking: checkBookingReducer,
   bookedDates: bookedDatesReducer,
   bookings: bookingsReducer,
   bookingDetails: bookingDetailsReducer,
   newReview: newReviewReducer,
   checkReview: checkReviewReducer
   
})

export default reducers;