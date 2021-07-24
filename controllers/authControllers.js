import User from './../models/userModel';
import cloudinary from 'cloudinary';
import absoluteURL from 'next-absolute-url';
import catchAsyncErrors from './../middlewares/catchAsyncErrors';
import ErrorHandler from './../utils/errorHandler';

//**************** cloudinary configuration ****************//
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

/*============================================================
            Register User => api/auth/register
===============================================================*/
const registerUser = catchAsyncErrors(async (req, res) => {
	const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
		folder: 'next-reserve/avatars',
		width: '150',
		crop: 'scale',
	});

	const { name, email, password } = req.body;

	const user = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: result.public_id,
			url: result.secure_url,
		},
	});

	res.status(200).json({
		success: true,
		message: 'User registered successfully!',
	});
});

/*============================================================
            Current User Profile => api/me
===============================================================*/
const currentUserProfile = catchAsyncErrors(async (req, res) => {
	const user = await User.findById(req.user._id);

	res.status(200).json({
		success: true,
		user,
	});
});

export { registerUser, currentUserProfile };
