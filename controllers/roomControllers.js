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
            Get Room Details => (GET)/api/rooms/:id
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

/*===============================================================
            Update Room Details => (PUT)/api/rooms/:id
==================================================================*/
const updateRoom = async (req, res) => {
	try {
		const room = await Room.findById(req.query.id);
      
      if (!room) {
         return res.status(400).json({
			success: false,
			error: 'Room not found with this ID!'
      })
   }

   const updateRoom = await Room.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
   });

		res.status(200).json({
			success: true,
			updateRoom,
		});

	} catch (error) {
		res.status(400).json({
			success: false,
			error: error.message,
		});
	}
};

/*===============================================================
            Delete Room => (DELETE)/api/rooms/:id
==================================================================*/
const deleteRoom = async (req, res) => {
	try {
		const room = await Room.findById(req.query.id);
      
      if (!room) {
         return res.status(400).json({
			success: false,
			error: 'Room not found with this ID!'
      })
   }

   await room.remove();

		res.status(200).json({
			success: true,
			message: 'Room has been deleted!'
		});

	} catch (error) {
		res.status(400).json({
			success: false,
			error: error.message,
		});
	}
};

export { allRooms, newRoom, getSingleRoom, updateRoom, deleteRoom };
