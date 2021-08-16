import { combineReducers } from 'redux';
import {
	allRoomsReducer,
	roomDetailsReducer,
	newReviewReducer,
	checkReviewReducer,
	newRoomReducer,
	roomReducer,
	roomReviewsReducer,
	reviewReducer
} from './roomReducers';
import {
	authReducer,
	userReducer,
	loadedUserReducer,
	forgotPasswordReducer,
   allUsersReducer,
	userDetailsReducer
} from './userReducers';
import {
	checkBookingReducer,
	bookedDatesReducer,
	bookingsReducer,
	bookingReducer,
	bookingDetailsReducer,
} from './bookingReducers';

const reducers = combineReducers({
	allRooms: allRoomsReducer,
	newRoom: newRoomReducer,
	roomDetails: roomDetailsReducer,
	room: roomReducer,
	auth: authReducer,
	user: userReducer,
	loadedUser: loadedUserReducer,
   allUsers: allUsersReducer,
	userDetails: userDetailsReducer,
	forgotPassword: forgotPasswordReducer,
	checkBooking: checkBookingReducer,
	bookedDates: bookedDatesReducer,
	bookings: bookingsReducer,
	booking: bookingReducer,
	bookingDetails: bookingDetailsReducer,
	newReview: newReviewReducer,
	checkReview: checkReviewReducer,
	roomReviews: roomReviewsReducer,
	review: reviewReducer
});

export default reducers;
