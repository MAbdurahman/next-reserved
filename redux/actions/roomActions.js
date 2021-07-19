import axios from 'axios';
import absoluteUrl from 'next-absolute-url';

import {
	ALL_ROOMS_SUCCESS,
	ALL_ROOMS_FAIL,
	ROOM_DETAILS_SUCCESS,
	ROOM_DETAILS_FAIL,
	NEW_REVIEW_REQUEST,
	NEW_REVIEW_SUCCESS,
	NEW_REVIEW_FAIL,
	REVIEW_AVAILABILITY_REQUEST,
	REVIEW_AVAILABILITY_SUCCESS,
	REVIEW_AVAILABILITY_FAIL,
	ADMIN_ROOMS_REQUEST,
	ADMIN_ROOMS_SUCCESS,
	ADMIN_ROOMS_FAIL,
	NEW_ROOM_REQUEST,
	NEW_ROOM_SUCCESS,
	NEW_ROOM_FAIL,
	UPDATE_ROOM_REQUEST,
	UPDATE_ROOM_SUCCESS,
	UPDATE_ROOM_FAIL,
	DELETE_ROOM_REQUEST,
	DELETE_ROOM_SUCCESS,
	DELETE_ROOM_FAIL,
	GET_REVIEWS_REQUEST,
	GET_REVIEWS_SUCCESS,
	GET_REVIEWS_FAIL,
	DELETE_REVIEW_REQUEST,
	DELETE_REVIEW_SUCCESS,
	DELETE_REVIEW_RESET,
	DELETE_REVIEW_FAIL,
	CLEAR_ERRORS,
} from '../constants/roomConstants';

/*======================================================
      Get All Rooms
=========================================================*/
export const getRooms = (
	req,
	currentPage = 1,
	location = '',
	guests,
	category
) => async dispatch => {
	try {
		const { origin } = absoluteUrl(req);

		let link = `${origin}/api/rooms?page=${currentPage}&location=${location}`;
		if (guests) {
			link = link.concat(`&guestCapacity=${guests}`);
		}
		if (category) {
			link = link.concat(`&category=${category}`);
		}

		const { data } = await axios.get(link);

		dispatch({
			type: ALL_ROOMS_SUCCESS,
			payload: data,
		});
		
	} catch (error) {
		dispatch({
			type: ALL_ROOMS_FAIL,
			payload: error.response.data.message,
		});
	}
};

/*======================================================
      Get Room Details
=========================================================*/
export const getRoomDetails = (req, id) => async dispatch => {
	try {
		const { origin } = absoluteUrl(req);

		let url;

		if (req) {
			url = `${origin}/api/rooms/${id}`;
		} else {
			url = `/api/rooms/${id}`;
		}

		const { data } = await axios.get(url);

		dispatch({
			type: ROOM_DETAILS_SUCCESS,
			payload: data.room,
		});
	} catch (error) {
		dispatch({
			type: ROOM_DETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
};

/*======================================================
      Clear Errors
=========================================================*/
export const clearErrors = () => async dispatch => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};