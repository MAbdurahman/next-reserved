import Room from '../models/roomModel';
import Booking from '../models/bookingModel';
import cloudinary from 'cloudinary';
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
	const images = req.body.images;

	let imagesLinks = [];

	for (let i = 0; i < images.length; i++) {
		const result = await cloudinary.v2.uploader.upload(images[i], {
			folder: 'next-reserve/rooms',
		});

		imagesLinks.push({
			public_id: result.public_id,
			url: result.secure_url,
		});
	}

	req.body.images = imagesLinks;
	req.body.user = req.user._id;

	const room = await Room.create(req.body);

	res.status(200).json({
		success: true,
		room,
	});
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
      (admin) Update Room Details => (PUT)/api/rooms/:id
==================================================================*/
const updateRoom = catchAsyncErrors(async (req, res, next) => {
	const room = await Room.findById(req.query.id);

	if (!room) {
		return next(new ErrorHandler('A room with this ID was not found!', 404));
	}

	if (req.body.images) {
		//******** delete images associated the room ********//
		for (let i = 0; i < room.images.length; i++) {
			await cloudinary.v2.uploader.destroy(room.images[i].public_id);
		}

		let imagesLinks = [];
		const images = req.body.images;

		for (let i = 0; i < images.length; i++) {
			const result = await cloudinary.v2.uploader.upload(images[i], {
				folder: 'next-reserve/rooms',
			});

			imagesLinks.push({
				public_id: result.public_id,
				url: result.secure_url,
			});
		}

		req.body.images = imagesLinks;
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

	//******** delete images associated the room ********//
	for (let i = 0; i < room.images.length; i++) {
		await cloudinary.v2.uploader.destroy(room.images[i].public_id);
	}

	await room.remove();

	res.status(200).json({
		success: true,
		message: 'Room has been deleted!',
	});
});

/*===============================================================
      Create A New RoomReview => (PUT)/api/reviews
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
      (admin) Get All Room Reviews => (GET)/api/reviews
==================================================================*/
const getRoomReviews = catchAsyncErrors(async (req, res) => {
	const room = await Room.findById(req.query.id);

	res.status(200).json({
		success: true,
		reviews: room.reviews,
	});
});

/*===============================================================
		(admin) Delete Room Review => (DELETE)/api/reviews/:id
==================================================================*/
const deleteReview = catchAsyncErrors(async (req, res) => {
	const room = await Room.findById(req.query.roomId);

	const reviews = room.reviews.filter(
		review => review._id.toString() !== req.query.id.toString()
	);

	const numOfReviews = reviews.length;

	const ratings =
		room.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

	await Room.findByIdAndUpdate(
		req.query.roomId,
		{
			reviews,
			ratings,
			numOfReviews,
		},
		{
			new: true,
			runValidators: true,
			useFindAndModify: false,
		}
	);

	res.status(200).json({
		success: true,
	});
});
export {
	allRooms,
	newRoom,
	getSingleRoom,
	updateRoom,
	deleteRoom,
	createRoomReview,
	checkReviewAvailability,
	allAdminRooms,
	getRoomReviews,
	deleteReview
};
