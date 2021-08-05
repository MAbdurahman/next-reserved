module.exports = {
	reactStrictMode: true,
	env: {
		MONGO_DB_URI: 'mongodb://localhost:27017/next-reserved',
		SEED_DB_URI: 'mongodb://localhost:27017/next-reserved',

		CLOUDINARY_CLOUD_NAME: 'mdbdrrhm',
		CLOUDINARY_API_KEY: '485699669179417',
		CLOUDINARY_API_SECRET: 'T6yk71envnm0oFbnWSjFt_PX2pQ',

		NEXTAUTH_URL: '',

		SMTP_HOST: 'smtp.mailtrap.io',
		SMTP_PORT: '2525',
		SMTP_USER: '77fe545b965119',
		SMTP_PASSWORD: 'b0668bd1abac1f',

		SMTP_FROM_NAME: 'e-Reserve',
		SMTP_FROM_EMAIL: 'noreply@ereserve.com',

		STRIPE_API_KEY:
			'pk_test_51JKNTyB0RTWTbgzIuADyy8ypnw55SIUzaHrvX3bhUNQwovKdqELviGYj2w4hjT3wdjzMjeObERjQnas2WWcJNpL800Gg5zR2JJ',
		STRIPE_SECRET_KEY:
			'sk_test_51JKNTyB0RTWTbgzIqktyjDPthoNKdZytf7h7WEEVtWtLWgJQyAu4Nn0yE1Km31h9N1n3bZDWSA42m06xw7iao3ZD00yMddj0Cp',

		STRIPE_WEBHOOK_SECRET: 'whsec_54uoHzVmTf9PcTtX0etJalun53H1mWeM',
	},
	images: {
		domains: ['res.cloudinary.com'],
	},
};
