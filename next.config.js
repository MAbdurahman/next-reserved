module.exports = {
	reactStrictMode: true,
	env: {
		MONGO_DB_URI: 'mongodb://localhost:27017/next-reserved',
		SEED_DB_URI: 'mongodb://localhost:27017/next-reserved',
	},
	images: {
		domains: ['res.cloudinary.com'],
	},
};
