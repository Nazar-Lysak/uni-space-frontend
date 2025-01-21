import { axiosClient } from '../plugins/axiosClient.js';
import { RecipePostData } from '../types/interfaces.js';
import { SERVER_ORIGIN } from '../variables/api';
import { URLs } from '../variables/requests';

export const PostData = {    
    addRecipe: (recipeData: RecipePostData) => {
        return axiosClient.post(`${SERVER_ORIGIN}${URLs.recipes.post}`, recipeData);
    },   
}