import Booking from "./../models/bookingModel";
import Room from "./../models/roomModel";
import User from "./../models/userModel";
import catchAsyncErrors from "./../middlewares/catchAsyncErrors";
import absoluteUrl from "next-absolute-url";
import getRawBody from "raw-body";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

/*==============================================================================
   Generate Stripe Checkout Session => (POST)/api/check_session/:roomId
=================================================================================*/
const stripeCheckoutSession = catchAsyncErrors(async (req, res) => {
	//************** get room details **************//
	const room = await Room.findById(req.query.roomId);

	const { checkInDate, checkOutDate, daysOfStay } = req.query;

	//**************** get origin ****************//
	const { origin } = absoluteUrl(req);

	//*********** create stripe checkout ***********//
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		success_url: `${origin}/bookings/me`,
		cancel_url: `${origin}/room/${room._id}`,
		customer_email: req.user.email,
		client_reference_id: req.query.roomId,
		metadata: { checkInDate, checkOutDate, daysOfStay },
		line_items: [
			{
				name: room.name,
				images: [`${room.images[0].url}`],
				amount: req.query.amount * 100,
				currency: 'usd',
				quantity: 1,
			},
		],
	});

	res.status(200).json(session);
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

export {
   stripeCheckoutSession
}