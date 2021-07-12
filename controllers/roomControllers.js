import Room from '../models/roomModel';
import ErrorHandler from '../utils/errorHandler';

/*===============================================================
         Get All Rooms => (GET)/api/rooms
==================================================================*/
const allRooms = async (req, res, next) => {
	try {
		const rooms = await Room.find({});

		res.status(200).json({
			success: true,
			count: rooms.length,
			rooms,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			error: error.message,
		});
	}
};

/*===============================================================
            Create A New Room => (post)/api/rooms
==================================================================*/
const newRoom = async (req, res) => {
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
};

/*===============================================================
            Get Room Details => (GET)/api/rooms/:id
==================================================================*/
const getSingleRoom = async (req, res, next) => {
	const room = await Room.findById(req.query.id);

	if (!room) {
		return next(new ErrorHandler('A room was not found with this ID!', 404));
	}

	res.status(200).json({
		success: true,
		room,
	});
};

/*===============================================================
            Update Room Details => (PUT)/api/rooms/:id
==================================================================*/
const updateRoom = async (req, res, next) => {
	const room = await Room.findById(req.query.id);

	if (!room) {
		return next(new ErrorHandler('A room was not found with this ID!', 404));
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
};

/*===============================================================
            Delete Room => (DELETE)/api/rooms/:id
==================================================================*/
const deleteRoom = async (req, res) => {
	const room = await Room.findById(req.query.id);

	if (!room) {
		return next(new ErrorHandler('A room was not found with this ID!', 404));
	}

	await room.remove();

	res.status(200).json({
		success: true,
		message: 'Room has been deleted!',
	});
};

export { allRooms, newRoom, getSingleRoom, updateRoom, deleteRoom };
