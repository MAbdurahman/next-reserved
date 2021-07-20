import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import User from './../../../models/userModel';
import connectDatabase from './../../../config/connectDatabase';

export default NextAuth({
	session: {
		jwt: true,
	},
	providers: [
		Providers.Credentials({
			async authorize(credentials) {
				connectDatabase();

				const { email, password } = credentials;

				//**************** Check if email and password entered ****************//
				if (!email) {
					throw new Error('Enter email!');
				}
				if (!password) {
					throw new Error('Enter password!');
				}

				//**************** Find user email in the database****************//
				const user = await User.findOne({ email }).select('+password');

				if (!user) {
					throw new Error('Invalid email or password!');
				}

				//**************** Check if password is correct ****************//
				const isPasswordMatched = await user.comparePassword(password);

				if (!isPasswordMatched) {
					throw new Error('Invalid email or password!');
				}

				return Promise.resolve(user);
			},
		}),
	],
	callbacks: {
		jwt: async (token, user) => {
			user && (token.user = user);
			return Promise.resolve(token);
		},
		session: async (session, user) => {
			session.user = user.user;
			return Promise.resolve(session);
		},
	},
});
