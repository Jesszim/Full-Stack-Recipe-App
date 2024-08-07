import { HANDLE_INPUT, EDIT_RECIPE, SET_RECIPES, SET_DISPLAY_RECIPES, UPDATE_RECIPE_PAGE } from './types'

let initialState = {
    recipes: [],
    display: [],
    page: 0,
    search: '',

    name: '',
    description: '',
    author: '',
    ingredients: '',
    instructions: '',

    editName: '',
    editDescription: '',
    editAuthor: '',
    editIngredients: '',
    editInstructions: '',
    editId: '',

}

// reducer is used to modify state
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case HANDLE_INPUT:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }

        case EDIT_RECIPE:

            let editRecipe = state.recipes.find((recipe) => recipe._id === action.payload)
            return {
                ...state,
                editName: editRecipe.name,
                editDescription: editRecipe.description,
                editAuthor: editRecipe.author,
                editIngredients: editRecipe.ingredients,
                editInstructions: editRecipe.instructions,
                editId: action.payload,
       
            }

        case SET_RECIPES:
            let recipes = action.payload
            return {
                ...state,
                name: '',
                description: '',
                author: '',
                ingredients: '',
                instructions: '',
        
                editName: '',
                editDescription: '',
                editAuthor: '',
                editIngredients: '',
                editInstructions: '',
                editId: '',
     
                recipes: recipes.reverse()
            }

        case SET_DISPLAY_RECIPES:
            let start = state.page * 20
            let end = start + 20
            let display = state.recipes.slice(start, end)
            return {
                ...state,
                display: display
            }

        case UPDATE_RECIPE_PAGE:

            let newPage = state.page === 0 && action.payload < 0 ? 80 : state.page === 80 && action.payload>0?0 :state.page + action.payload

            return {
                ...state,
                page: newPage
            }

        default:
            return state;
    }
}

export default reducer