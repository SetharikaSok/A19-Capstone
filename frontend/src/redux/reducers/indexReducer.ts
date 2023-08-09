import { counterReducer } from "./counter";
import { combineReducers } from "redux";
import { profileReducer } from "./profileReducer";

const allReducers = combineReducers({
    counter: counterReducer,
    userProfile: profileReducer,
});

export default allReducers;