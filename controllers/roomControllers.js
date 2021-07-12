import Room from '../models/roomModel';

/*===============================================================
         Get All Rooms => (GET)/api/rooms
==================================================================*/
const allRooms = (req, res) => {
	res.status(200).json({
		success: true,
		message: 'All Rooms!',
	});
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

export { allRooms, newRoom };
