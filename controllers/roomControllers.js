import Room from '../models/roomModel';

/*===============================================================
         Get All Rooms => (GET)/api/rooms
==================================================================*/
const allRooms = async (req, res) => {
   try {
      const rooms = await Room.find({});

      res.status(200).json({
         success: true,
         count: rooms.length,
         rooms
      })
      
   } catch (error) {
      res.status(400).json({
         success: false,
         error: error.message
      })
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
            Get Room Details => (get)/api/rooms/:id
==================================================================*/
const getSingleRoom = async (req, res) => {
	try {
		const room = await Room.findById(req.query.id);
      
      if (!room) {
         return res.status(400).json({
			success: false,
			error: 'Room not found with this ID!'
      })
   }

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

export { allRooms, newRoom, getSingleRoom };
