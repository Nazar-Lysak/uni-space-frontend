import { axiosClient } from '../plugins/axiosClient.js';
import { SERVER_ORIGIN } from '../variables/api';
import { URLs } from '../variables/requests';

export const GetData = {    
    markets: () => {
        return axiosClient.get(`${SERVER_ORIGIN}${URLs.markets.get}`);
    },
    users: () => {
        return axiosClient.get(`${SERVER_ORIGIN}${URLs.users.get}`);
    },
    recipes: () => {
        return axiosClient.get(`${SERVER_ORIGIN}${URLs.recipes.get}`);
    },
    currentRecipe: (recipeId:string) => {
        return axiosClient.get(`${SERVER_ORIGIN}${URLs.recipes.get}/${recipeId}`);
    }
}