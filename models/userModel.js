import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

//**************** variables ****************//
const name_pattern = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)/i;
const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const password_pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*?]).{8,}$/i;

const userSchema = mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: [true, 'First and last name is required!'],
		match: [name_pattern, 'Enter first and last name!'],
		maxLength: 34,
	},
	email: {
		type: String,
		trim: true,
		required: [true, 'Email is required!'],
		unique: [true, 'Email already exists!'],
		match: [email_pattern, 'Enter a valid email!'],
	},
	password: {
		type: String,
		trim: true,
		required: [true, 'Password is required!'],
		minLength: [8, 'Password must be at least 8 characters!'],
		match: [
			password_pattern,
			'Password must have at least one of the following: lowercase, uppercase, number, and special character!',
		],
		select: false,
	},
	avatar: {
		public_id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	role: {
		type: String,
		trim: true,
		default: 'user',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
});

//**************** Encrypting password before saving ****************//
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});

//**************** Compare User Password ****************//
userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};
//**************** Generate Password Reset Token ****************//
userSchema.methods.getResetPasswordToken = function () {

	//**************** generate the token ****************//
	const resetToken = crypto.randomBytes(20).toString('hex');

	//***** hash and set to resetPasswordToken field *****//
	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	//**************** set token expire time ****************//
	const oneDay = 24 * 60 * 60 * 1000;
	this.resetPasswordExpire = Date.now() + oneDay;

	return resetToken;
};

export default mongoose.models.User || mongoose.model('User', userSchema);
