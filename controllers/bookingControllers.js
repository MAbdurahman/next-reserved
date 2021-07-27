import Booking from './../models/bookingModel';
import catchAsyncErrors from './../middlewares/catchAsyncErrors';
import ErrorHandler from './../utils/errorHandler';

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
/*===============================================================
            Get All Rooms => (GET)/api/rooms
==================================================================*/
/*===============================================================
            Get All Rooms => (GET)/api/rooms
==================================================================*/
/*===============================================================
            Get All Rooms => (GET)/api/rooms
==================================================================*/
/*===============================================================
            Get All Rooms => (GET)/api/rooms
==================================================================*/
/*===============================================================
            Get All Rooms => (GET)/api/rooms
==================================================================*/

export { newBooking, checkRoomBookingAvailability };
