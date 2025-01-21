import { axiosClient } from '../plugins/axiosClient.js';
import { RecipePostData } from '../types/interfaces.js';
import { SERVER_ORIGIN } from '../variables/api';
import { URLs } from '../variables/requests';

export const PutData = {
    putRecipe: (recipeId: string, recipeData: RecipePostData) => {
      return axiosClient.put(`${SERVER_ORIGIN}${URLs.recipes.put}/${recipeId}`, recipeData);
    },
  };