module.exports = {
	reactStrictMode: true,
	env: {
		MONGO_DB_URI: 'mongodb://localhost:27017/next-reserved',
		SEED_DB_URI: 'mongodb://localhost:27017/next-reserved',

		CLOUDINARY_CLOUD_NAME: 'mdbdrrhm',
		CLOUDINARY_API_KEY: '485699669179417',
		CLOUDINARY_API_SECRET: 'T6yk71envnm0oFbnWSjFt_PX2pQ',

		SMTP_HOST: 'smtp.mailtrap.io',
		SMTP_PORT: '2525',
		SMTP_USER: '77fe545b965119',
		SMTP_PASSWORD: 'b0668bd1abac1f',

		SMTP_FROM_NAME: 'e-Reserve',
		SMTP_FROM_EMAIL: 'noreply@ereserve.com',
	},
	images: {
		domains: ['res.cloudinary.com'],
	},
};
