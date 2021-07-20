import User from "./../models/userModel";
import absoluteURL from "next-absolute-url";
import catchAsyncErrors from "./../middlewares/catchAsyncErrors";
import ErrorHandler from "./../utils/errorHandler";




/*============================================================
            Register User => api/auth/register
===============================================================*/
const registerUser = catchAsyncErrors(async (req, res) => {

   const { name, email, password } = req.body;

   const user = await User.create({
      name,
      email,
      password,
      avatar: {
         public_id: 'PUBLIC ID',
         url: 'URL'
      }
   })

   res.status(200).json({
      success: true,
      message: 'User registered successfully!'

   })

})

















export {
   registerUser
}