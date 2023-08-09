import { SET_USER_PROFILE, UserProfile } from "../actions/profileAction";


const initialUserProfile: UserProfile = {
    fname: '',
    lname: '',
    email: '',
    webtoken: '',
    address: '',
};

export const profileReducer = (state = initialUserProfile, action: any) => {
    switch(action.type) {
        case SET_USER_PROFILE:
            return { ...state, ...action.payload};
        default:
            return state;
    }
};