import { combineReducers } from "redux";
import userReducer from "./userReducer"; // Correct import
import authReducer from "./authReducer";
import examReducer from "./examReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    exams: examReducer,
    
});

export default rootReducer;
