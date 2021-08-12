import { getSession } from 'next-auth/client';
import catchAsyncErrors from './catchAsyncErrors';
import ErrorHandler from './../utils/errorHandler';

/*=============================================
         isAuthenticatedUser
================================================*/
const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
	const session = await getSession({ req });

	if (!session) {
		return next(
			new ErrorHandler('Must be logged in to access this resource!', 401)
		);
	}

	req.user = session.user;
	next();
});

/*=============================================
         authorizeRoles
================================================*/
const authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new ErrorHandler(
					`Role (${req.user.role}) is not allowed to access this resource!`,
					403
				)
			);
		}

		next();
	};
};

export { isAuthenticatedUser, authorizeRoles };
