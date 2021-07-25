import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailsReducer } from "./roomReducers";
import {authReducer, loadedUserReducer, userReducer, forgotPasswordReducer} from "./userReducers";





const reducers = combineReducers({
   allRooms: allRoomsReducer,
   roomDetails: roomDetailsReducer,
   auth: authReducer,
   loadedUser: loadedUserReducer,
   user: userReducer,
   forgotPassword: forgotPasswordReducer
})










export default reducers;