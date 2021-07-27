import mongoose from 'mongoose';
import timeZone from 'mongoose-timezone';

const bookingSchema = new mongoose.Schema({
	room: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Room',
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	checkInDate: {
		type: Date,
		required: [true, 'Check-in-date is required!']
	},
	checkOutDate: {
		type: Date,
		required: [true, 'Check-out-date is required!']
	},
	amountPaid: {
		type: Number,
		required: [true, 'The amount paid is required!']
	},
	daysOfStay: {
		type: Number,
		required: [true, 'The number of days stay is required!']
	},
	paymentInfo: {
		id: {
			type: String,
			required: [true, 'Payment information is required!']
		},
		status: {
			type: String,
			required: true,
		},
	},
	paidAt: {
		type: Date,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

bookingSchema.plugin(timeZone);

export default mongoose.models.Booking ||
	mongoose.model('Booking', bookingSchema);
