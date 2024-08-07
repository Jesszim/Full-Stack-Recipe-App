import { useState, useEffect } from 'react'
import appAPI from '../utils/API/appAPI'

const SearchPage = () =>{
  let [searchInput, setSearchInput] = useState('')

useEffect(()=>{
appAPI.searchRecipe(searchInput)
}, [searchInput])

return(
  <div>
    <form>
      <input type='text' onChange={(e)=>{setSearchInput(e.target.value)}} />
    </form>
  </div>
)

}

export default SearchPage