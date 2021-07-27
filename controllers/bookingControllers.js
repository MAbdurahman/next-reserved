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
/*===============================================================
            Get All Rooms => (GET)/api/rooms
==================================================================*/

export {
   newBooking
}
