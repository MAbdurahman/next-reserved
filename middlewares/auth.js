import { getSession } from "next-auth/client";
import catchAsyncErrors from "./catchAsyncErrors";
import ErrorHandler from "./../utils/errorHandler";


/*=============================================
         isAuthenticatedUser
================================================*/
const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
	const session = await getSession({ req });

	if (!session) {
		return next(new ErrorHandler('Must be logged in to access this resource!', 401));
	}

	req.user = session.user;
	next();
});



export {
   isAuthenticatedUser
}