import { axiosClient } from '../plugins/axiosClient.js';
import { UserSignUp } from '../types/types';
import { SERVER_ORIGIN } from '../variables/api';
import { URLs } from '../variables/requests';

export const AuthService = {
    signup: (userData: UserSignUp) => {
        return axiosClient.post(`${SERVER_ORIGIN}${URLs.auth.signup}`, userData);
    }
}