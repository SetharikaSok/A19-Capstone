
export interface UserProfile {
    fname: string;
    lname: string;
    email: string;
    webtoken: string;
    address: string;
}

export const SET_USER_PROFILE = 'SET_USER_PROFILE';
export const CLEAR_USER_PROFILE = 'CLEAR_USER_PROFILE';

export const setUserProfile = (profile: UserProfile) => {
    return {
        type: SET_USER_PROFILE,
        payload: profile
    };
};

export const clearUserProfile = () => {
    return {
        type: CLEAR_USER_PROFILE
    };
};
