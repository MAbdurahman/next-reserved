import { startSession } from "mongoose";
import {
	ALL_ROOMS_SUCCESS,
	ALL_ROOMS_FAIL,
	ROOM_DETAILS_SUCCESS,
	ROOM_DETAILS_FAIL,
	NEW_REVIEW_REQUEST,
	NEW_REVIEW_SUCCESS,
	NEW_REVIEW_RESET,
	NEW_REVIEW_FAIL,
	REVIEW_AVAILABILITY_REQUEST,
	REVIEW_AVAILABILITY_SUCCESS,
	REVIEW_AVAILABILITY_FAIL,
	ADMIN_ROOMS_REQUEST,
	ADMIN_ROOMS_SUCCESS,
	ADMIN_ROOMS_FAIL,
	NEW_ROOM_REQUEST,
	NEW_ROOM_SUCCESS,
	NEW_ROOM_RESET,
	NEW_ROOM_FAIL,
	UPDATE_ROOM_REQUEST,
	UPDATE_ROOM_SUCCESS,
	UPDATE_ROOM_RESET,
	UPDATE_ROOM_FAIL,
	DELETE_ROOM_REQUEST,
	DELETE_ROOM_SUCCESS,
	DELETE_ROOM_RESET,
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
      All Rooms Reducer
=========================================================*/
export const allRoomsReducer = (state = { rooms: [] }, action) => {
	switch (action.type) {
		case ALL_ROOMS_SUCCESS:
			return {
				roomsCount: action.payload.roomsCount,
				resultPerPage: action.payload.resultPerPage,
				filteredRoomsCount: action.payload.filteredRoomsCount,
				rooms: action.payload.rooms,
			};
		case ALL_ROOMS_FAIL:
			return {
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

/*======================================================
      Room Details Reducer
=========================================================*/
export const roomDetailsReducer = (state = { room: {} }, action) => {
	switch (action.type) {
		case ROOM_DETAILS_SUCCESS:
			return {
				room: action.payload,
			};

		case ROOM_DETAILS_FAIL:
			return {
				error: action.payload,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

/*======================================================
               New Review Reducer
=========================================================*/
export const newReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case NEW_REVIEW_REQUEST:
			return {
				loading: true,
			};

		case NEW_REVIEW_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			};

		case NEW_REVIEW_RESET:
			return {
				success: false,
			};

		case NEW_REVIEW_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

/*======================================================
      Room Details Reducer
=========================================================*/
/*======================================================
      Room Details Reducer
=========================================================*/
/*======================================================
      Room Details Reducer
=========================================================*/
/*======================================================
      Room Details Reducer
=========================================================*/