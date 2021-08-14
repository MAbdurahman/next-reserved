import Booking from './../models/bookingModel';
import catchAsyncErrors from './../middlewares/catchAsyncErrors';
import ErrorHandler from './../utils/errorHandler';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

/*===============================================================
         Create New Booking => (POST)/api/bookings
==================================================================*/
const newBooking = catchAsyncErrors(async (req, res) => {
	const {
		room,
		checkInDate,
		checkOutDate,
		daysOfStay,
		amountPaid,
		paymentInfo,
	} = req.body;

	const booking = await Booking.create({
		room,
		user: req.user._id,
		checkInDate,
		checkOutDate,
		daysOfStay,
		amountPaid,
		paymentInfo,
		paidAt: Date.now(),
	});

	res.status(200).json({
		success: true,
		booking,
	});
});
/*=====================================================================
   Check RoomBooking Availability => (GET)/api/bookings/check
========================================================================*/
const checkRoomBookingAvailability = catchAsyncErrors(async (req, res) => {
	let { roomId, checkInDate, checkOutDate } = req.query;

	checkInDate = new Date(checkInDate);
	checkOutDate = new Date(checkOutDate);

	const bookings = await Booking.find({
		room: roomId,
		$and: [
			{
				checkInDate: {
					$lte: checkOutDate,
				},
			},
			{
				checkOutDate: {
					$gte: checkInDate,
				},
			},
		],
	});

	//*** check if any booking is available ***//
	let isAvailable;

	if (bookings && bookings.length === 0) {
		isAvailable = true;
	} else {
		isAvailable = false;
	}

	res.status(200).json({
		success: true,
		isAvailable,
	});
});
/*==============================================================================
   Check Booked Dates Of A Room => (GET)/api/bookings/check_booked_dates
=================================================================================*/
const checkBookedDatesOfRoom = catchAsyncErrors(async (req, res) => {
	const { roomId } = req.query;

	const bookings = await Booking.find({ room: roomId });

	let bookedDates = [];

	const timeDifference = moment().utcOffset() / 60;

	bookings.forEach(booking => {
		const checkInDate = moment(booking.checkInDate).add(
			timeDifference,
			'hours'
		);
		const checkOutDate = moment(booking.checkOutDate).add(
			timeDifference,
			'hours'
		);

		const range = moment.range(moment(checkInDate), moment(checkOutDate));

		const dates = Array.from(range.by('day'));
		bookedDates = bookedDates.concat(dates);
	});

	res.status(200).json({
		success: true,
		bookedDates,
	});
});
/*==================================================================
      Get Bookings of Current User => (GET)/api/bookings/me
=====================================================================*/
const myBookings = catchAsyncErrors(async (req, res) => {
	const bookings = await Booking.find({ user: req.user._id })
		.populate({
			path: 'room',
			select: 'name pricePerNight images',
		})
		.populate({
			path: 'user',
			select: 'name email',
		});

	res.status(200).json({
		success: true,
		bookings,
	});
});
/*===============================================================
      Get Booking Details => (GET)/api/bookings/:id
==================================================================*/
const getBookingDetails = catchAsyncErrors(async (req, res) => {
	const booking = await Booking.findById(req.query.id)
		.populate({
			path: 'room',
			select: 'name pricePerNight images',
		})
		.populate({
			path: 'user',
			select: 'name email',
		});

	res.status(200).json({
		success: true,
		booking,
	});
});
/*=====================================================================
      (admin) Get All Bookings => (GET)/api/admin/bookings
========================================================================*/
const allAdminBookings = catchAsyncErrors(async (req, res) => {
	const bookings = await Booking.find()
		.populate({
			path: 'room',
			select: 'name pricePerNight images',
		})
		.populate({
			path: 'user',
			select: 'name email',
		});

	res.status(200).json({
		success: true,
		bookings,
	});
});

/*===========================================================================
         (admin) Delete Booking => (DELETE)/api/admin/bookings/:id
==============================================================================*/
const deleteBooking = catchAsyncErrors(async (req, res, next) => {
	const booking = await Booking.findById(req.query.id);

	if (!booking) {
		return next(new ErrorHandler('Reservation with this ID was not found!', 404));
	}

	await booking.remove();

	res.status(200).json({
		success: true,
	});
});



export {
	newBooking,
	checkRoomBookingAvailability,
	checkBookedDatesOfRoom,
	myBookings,
	getBookingDetails,
	allAdminBookings,
	deleteBooking
};
