import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailsReducer } from "./roomReducers";
import {authReducer, loadedUserReducer, userReducer} from "./userReducers";





const reducers = combineReducers({
   allRooms: allRoomsReducer,
   roomDetails: roomDetailsReducer,
   auth: authReducer,
   loadedUser: loadedUserReducer,
   user: userReducer
})










export default reducers;