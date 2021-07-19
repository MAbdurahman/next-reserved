import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from "bcryptjs";

//**************** variables ****************//
const name_pattern = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)/i;
const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const password_pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*?]).{8,}$/i;
const lowercase_pattern = /^(?=.*[a-z])/g;
const uppercase_pattern = /^(?=.*[A-Z])/g;
const digit_pattern = /^(?=.*\d{1,})/g;
const special_pattern = /(?=.*[-+_!@#$%^&*?])/g;

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
		match: [lowercase_pattern, 'Password must have a lowercase character!'],
		match: [uppercase_pattern, 'Password must have a uppercase character!'],
		match: [digit_pattern, 'Password must have a digit character!'],
		match: [
			special_pattern,
			`Password must include at least one: '-+_!@#$%^&*?'`,
		],
		match: [password_pattern, 'Password must have at least 8 characters!'],
		select: false,
	},
	avatar: {
		public_id: {
			type: String,
			required: true,
			default: '/images/default-user.png',
		},
		url: {
			type: String,
			required: true,
			default: '/images/default-user.png',
		},
	},
	role: {
		type: String,
		default: 'user',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
});






export default mongoose.models.User || mongoose.model('User', userSchema);