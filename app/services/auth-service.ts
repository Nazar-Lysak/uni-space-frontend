import { axiosClient } from '../plugins/axiosClient.js';
import { UserSignUp, UserSignIn } from '../types/types';
import { SERVER_ORIGIN } from '../variables/api';
import { URLs } from '../variables/requests';

export const AuthService = {
    signup: (userData: UserSignUp) => {
        return axiosClient.post(`${SERVER_ORIGIN}${URLs.auth.signup}`, userData);
    },
    signin: (userData: UserSignIn) => {
        return axiosClient.post(`${SERVER_ORIGIN}${URLs.auth.login}`, userData);
    },
}