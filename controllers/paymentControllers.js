import Booking from './../models/bookingModel';
import Room from './../models/roomModel';
import User from './../models/userModel';
import catchAsyncErrors from './../middlewares/catchAsyncErrors';
import absoluteUrl from 'next-absolute-url';
import getRawBody from 'raw-body';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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

/*========================================================================
      Create New Booking After Payment => (POST)/api/webhook
===========================================================================*/
const webhookCheckout = catchAsyncErrors(async (req, res) => {
	
	const rawBody = await getRawBody(req);

	try {
		const signature = req.headers['stripe-signature'];

		const event = stripe.webhooks.constructEvent(
			rawBody,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET
		);

		if (event.type === 'checkout.session.completed') {
			const session = event.data.object;

			const room = session.client_reference_id;
			const user = (await User.findOne({ email: session.customer_email })).id;

			const amountPaid = session.amount_total / 100;

			const paymentInfo = {
				id: session.payment_intent,
				status: session.payment_status,
			};

			const checkInDate = session.metadata.checkInDate;
			const checkOutDate = session.metadata.checkOutDate;
			const daysOfStay = session.metadata.daysOfStay;

			const booking = await Booking.create({
				room,
				user,
				checkInDate,
				checkOutDate,
				daysOfStay,
				amountPaid,
				paymentInfo,
				paidAt: Date.now(),
			});

			res.status(200).json({ success: true, booking});
		}
	} catch (error) {
		console.log('Error in Stripe Checkout Payment => ', error);
	}
});
/*===============================================================
            Get All Rooms => (GET)/api/rooms
==================================================================*/

/*===============================================================
            Get All Rooms => (GET)/api/rooms
==================================================================*/

export { stripeCheckoutSession, webhookCheckout};
