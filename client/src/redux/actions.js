import { HANDLE_INPUT, EDIT_RECIPE, SET_RECIPES, SET_DISPLAY_RECIPES, UPDATE_RECIPE_PAGE } from "./types";

export const handleInput = (input) => {
    return {
        type: HANDLE_INPUT,
        payload: input
    }
}

export const editRecipe = (id) => {
    return {
        type: EDIT_RECIPE,
        payload: id
    }
}

export const setRecipes = (recipes) => {
    return {
        type: SET_RECIPES,
        payload: recipes
    }
}

export const setDisplayRecipes = () =>{
    return{
                type: SET_DISPLAY_RECIPES
    }
}

export const updateRecipePage = (input)=>{
    return{
        type: UPDATE_RECIPE_PAGE,
        payload: input
    }
}