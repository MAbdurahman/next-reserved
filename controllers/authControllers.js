import User from './../models/userModel';
import cloudinary from 'cloudinary';
import absoluteURL from 'next-absolute-url';
import catchAsyncErrors from './../middlewares/catchAsyncErrors';
import ErrorHandler from './../utils/errorHandler';
import sendEmail from "./../utils/sendEmail";

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

/*============================================================
            Update User Profile => api/me/update
===============================================================*/
const updateProfile = catchAsyncErrors(async (req, res) => {
	const user = await User.findById(req.user._id);

	//************ update input fields ************//
	if (user) {
		user.name = req.body.name;
		user.email = req.body.email;

		if (req.body.password) {
			user.password = req.body.password;
		}
	}
	//**************** update avatar ****************//
	if (req.body.avatar !== '') {
		const image_id = user.avatar.public_id;

		//******** delete user previous image/avatar ********//
		await cloudinary.v2.uploader.destroy(image_id);

		const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
			folder: 'next-reserve/avatars',
			width: '150',
			crop: 'scale',
		});

		user.avatar = {
			public_id: result.public_id,
			url: result.secure_url,
		};
	}

	//***** save user to database *****//
	await user.save();

	res.status(200).json({
		success: true,
	});
});

/*============================================================
         Forgot Password => api/password/forgot
===============================================================*/
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorHandler('Email not found!', 404));
	}

	//**************** get reset token ****************//
	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	//**************** get the origin ****************//
	const { origin } = absoluteURL(req);

	//************* create reset password url *************//
	const resetUrl = `${origin}/password/reset/${resetToken}`;

	const message = `Password reset url is as follow: \n\n ${resetUrl} \n\n\ If you did not request a password reset, ignore this email.`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'e-Reserve Password Recovery',
			message,
		});

		res.status(200).json({
			success: true,
			message: `Email sent to: ${user.email}`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		return next(new ErrorHandler(error.message, 500));
	}
});

// Reset password   =>   /api/password/reset/:token
/*============================================================
            Update User Profile => api/me/update
===============================================================*/
const resetPassword = catchAsyncErrors(async (req, res, next) => {
	// Hash URL token
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.query.token)
		.digest('hex');

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(
			new ErrorHandler(
				'Password reset token is invalid or has been expired',
				400
			)
		);
	}

	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHandler('Password does not match', 400));
	}

	// Setup the new password
	user.password = req.body.password;

	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	res.status(200).json({
		success: true,
		message: 'Password updated successfully',
	});
});

export {
	registerUser,
	currentUserProfile,
	updateProfile,
	forgotPassword,
	resetPassword,
};
