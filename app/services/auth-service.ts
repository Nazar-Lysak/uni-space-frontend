import { axiosClient } from '../plugins/axiosClient.js';
import { SERVER_ORIGIN } from '../variables/api';
import { URLs } from '../variables/requests';

interface UserData {
    name?: string;
    email?: string;
    password?: string;
    market?: string;
}

export const AuthService = {
    signup: (userData: UserData) => {
        return axiosClient.post(`${SERVER_ORIGIN}${URLs.auth.signup}`, userData);
    }
}