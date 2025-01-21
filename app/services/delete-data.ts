import { axiosClient } from '../plugins/axiosClient.js';
import { SERVER_ORIGIN } from '../variables/api';
import { URLs } from '../variables/requests';

export const DeleteData = {    
    deleteRecipe: (recipeId: string) => {
        return axiosClient.delete(`${SERVER_ORIGIN}${URLs.recipes.delete}/${recipeId}`);
    },   
}