import axios from 'axios'
import store from '../../redux/store'
import { setDisplayRecipes, setRecipes } from '../../redux/actions'

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL

const appAPI = {
  getAllRecipes: async ()=>{
    const response = await axios.get(`${REACT_APP_BASE_URL}/`)
    if (response.status === 200){
      let recipes = response.data
      store.dispatch(setRecipes(recipes))
      store.dispatch(setDisplayRecipes())
    }
  },
   addRecipe: async (newRecipe)=> {
     const response = await axios.post(`${REACT_APP_BASE_URL}/addrecipe`, newRecipe)
     if (response.status === 200){
      let recipes = response.data
      store.dispatch(setRecipes(recipes))
      store.dispatch(setDisplayRecipes())
    }
   },
   deleteRecipe: async (_id) => {
    const response = await axios.delete(`${REACT_APP_BASE_URL}/deleterecipe`, {data:{ _id}})
    if (response.status === 200){
      let recipes = response.data
      store.dispatch(setRecipes(recipes))
      store.dispatch(setDisplayRecipes())
    }
   },
   updateRecipe: async (updatedRecipe) => {
    const response = await axios.patch(`${REACT_APP_BASE_URL}/updaterecipe`, updatedRecipe)
    if (response.status === 200){
      let recipes = response.data
      store.dispatch(setRecipes(recipes))
    }
},
searchRecipe: async (searchInput) => {
  const response = await axios.get(`${REACT_APP_BASE_URL}/searchrecipe?search=${searchInput}`)
  if (response.status === 200){
    let recipes = response.data
    store.dispatch(setRecipes(recipes))
    store.dispatch(setDisplayRecipes())
  }
}
}

export default appAPI