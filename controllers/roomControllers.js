import Room from '../models/roomModel';
import Booking from '../models/bookingModel';
import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import APIFeatures from './../utils/apiFeatures';

/*===============================================================
            Get All Rooms => (GET)/api/rooms
==================================================================*/
const allRooms = catchAsyncErrors(async (req, res, next) => {
	const resultPerPage = 4;
	const roomsCount = await Room.countDocuments();
	const apiFeatures = new APIFeatures(Room.find(), req.query)
		.search()
		.filter();

	let rooms = await apiFeatures.query;
	let filteredRoomsCount = rooms.length;

	apiFeatures.pagination(resultPerPage);
	rooms = await apiFeatures.query;

	res.status(200).json({
		success: true,
		roomsCount,
		resultPerPage,
		filteredRoomsCount,
		rooms,
	});
});

/*===============================================================
            Create A New Room => (post)/api/rooms
==================================================================*/
const newRoom = catchAsyncErrors(async (req, res) => {
	try {
		const room = await Room.create(req.body);

		res.status(200).json({
			success: true,
			room,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			error: error.message,
		});
	}
});

/*===============================================================
            Get Room Details => (GET)/api/rooms/:id
==================================================================*/
const getSingleRoom = catchAsyncErrors(async (req, res, next) => {
	const room = await Room.findById(req.query.id);

	if (!room) {
		return next(new ErrorHandler('A room with this ID was not found!', 404));
	}

	res.status(200).json({
		success: true,
		room,
	});
});

/*===============================================================
            Update Room Details => (PUT)/api/rooms/:id
==================================================================*/
const updateRoom = catchAsyncErrors(async (req, res, next) => {
	const room = await Room.findById(req.query.id);

	if (!room) {
		return next(new ErrorHandler('A room with this ID was not found!', 404));
	}

	const updateRoom = await Room.findByIdAndUpdate(req.query.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		updateRoom,
	});
});

/*===============================================================
            Delete Room => (DELETE)/api/rooms/:id
==================================================================*/
const deleteRoom = catchAsyncErrors(async (req, res) => {
	const room = await Room.findById(req.query.id);

	if (!room) {
		return next(new ErrorHandler('A room with this ID was not found!', 404));
	}

	await room.remove();

	res.status(200).json({
		success: true,
		message: 'Room has been deleted!',
	});
});

/*===============================================================
         Create A New Room => (PUT)/api/reviews
==================================================================*/
const createRoomReview = catchAsyncErrors(async (req, res) => {
	const { rating, comment, roomId } = req.body;

	const review = {
		user: req.user._id,
		name: req.user.name,
		rating: Number(rating),
		comment,
	};

	const room = await Room.findById(roomId);

	const isReviewed = room.reviews.find(
		r => r.user.toString() === req.user._id.toString()
	);

	if (isReviewed) {
		room.reviews.forEach(review => {
			if (review.user.toString() === req.user._id.toString()) {
				review.comment = comment;
				review.rating = rating;
			}
		});
	} else {
		room.reviews.push(review);
		room.numOfReviews = room.reviews.length;
	}

	room.ratings =
		room.reviews.reduce((acc, item) => item.rating + acc, 0) /
		room.reviews.length;

	await room.save({ validateBeforeSave: false });

	res.status(200).json({
		success: true,
	});
});

/*====================================================================================
      Check Review Availability => (GET)/api/review/check_review_availability
=======================================================================================*/
const checkReviewAvailability = catchAsyncErrors(async (req, res) => {
	const { roomId } = req.query;

	const bookings = await Booking.find({ user: req.user._id, room: roomId });

	let isReviewAvailable = false;
	if (bookings.length > 0) isReviewAvailable = true;

	res.status(200).json({
		success: true,
		isReviewAvailable,
	});
});
/*=====================================================================
   (admin) Get All Rooms => (GET)/api/admin/rooms
========================================================================*/
const allAdminRooms = catchAsyncErrors(async (req, res) => {
	const rooms = await Room.find();

	res.status(200).json({
		success: true,
		rooms,
	});
});
/*===============================================================
            Delete Room => (DELETE)/api/rooms/:id
==================================================================*/
/*===============================================================
            Delete Room => (DELETE)/api/rooms/:id
==================================================================*/ export {
	allRooms,
	newRoom,
	getSingleRoom,
	updateRoom,
	deleteRoom,
	createRoomReview,
	checkReviewAvailability,
	allAdminRooms
};
