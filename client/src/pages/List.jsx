import { connect } from 'react-redux'
import { editRecipe, handleInput, setDisplayRecipes, updateRecipePage } from '../redux/actions'
import appAPI from '../utils/API/appAPI'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import pie from '../images/pie.jpg'
import food from '../images/food.jpg'
import cupcake from '../images/cupcake.jpg'
import cake from '../images/cake.jpg'
import cookie from '../images/cookies.jpg'
import pizza from '../images/pizza.jpg'
import salad from '../images/salad.jpg'
import soup from '../images/soup.jpg'
// import bakingVideo from '../images/BakingVideo.mp4'

const List = (props) => {
  const [modal, setModal] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [modalRecipe, setModalRecipe] = useState({})
  const navigate = useNavigate()
  
  useEffect(() => {
    navigate(`/recipe-book/page-${props.page + 1}`)
  }, [props.page])

  const handleUpdate = (e) => {
    e.preventDefault()
    let updatedRecipe = {
      name: props.editName,
      description: props.editDescription,
      author: props.editAuthor,
      ingredients: props.editIngredients,
      instructions: props.editInstructions,
      _id: props.editId
    }
    appAPI.updateRecipe(updatedRecipe)
  }

  const handleDelete = (_id) => {
    appAPI.deleteRecipe(_id)
  }

  const handleSearch = (e) => {
    let { value } = e.target
    appAPI.searchRecipe(value)
  }


  const renderList = () => {

    return (

      props.display.map((recipe) => {
        return props.editId !== recipe._id ? <section id='box' key={recipe._id} onClick={() => { setModal(true); setModalRecipe(recipe) }}>
          <div id='recipeContainer' >
            {recipe.name.includes('cookie') ? <img className='image' src={cookie} /> : recipe.name.includes('pie') ? <img className='image' src={pie} /> : recipe.name.includes('cupcake') ? <img className='image' src={cupcake} /> : recipe.name.includes('cake') ? <img className='image' src={cake} /> : recipe.name.includes('pizza') ? <img className='image' src={pizza} /> : recipe.name.includes('salad') ? <img className='image' src={salad} /> : recipe.name.includes('soup') ? <img className='image' src={soup} /> : <img className='image' src={food} />}
            <h2>{recipe.name}</h2>
            <p className='p'>{recipe.description}</p>
            <h4>Author: </h4>
            <p>{recipe.author}</p>
          </div>
        </section> :
          <section id='editSection' key={recipe._id}>
            <form onSubmit={handleUpdate}>
              <h1 className='h1'>Edit Recipe</h1>

              <label>Name:  <input
                type="text"
                name='editName'
                value={props.editName}
                onChange={props.handleInput}
              /></label>
              <textarea name="editDescription" cols="50" rows="5"
                value={props.editDescription}
                onChange={props.handleInput}></textarea>
              <label>Author:<input
                type="text"
                name='editAuthor'
                value={props.editAuthor}
                onChange={props.handleInput}
              /> </label>
              <h3>Ingredients:</h3>
              {props.editIngredients.map(item => <input value={item} onChange={props.handleInput} />)}
              <h3>Instructions:</h3>
              {props.editInstructions.map(item => <textarea value={item} cols="50" rows='4' onChange={props.handleInput}></textarea>)}

              <button type="submit" onClick={() => setModal(false)}>Update</button>
            </form>
          </section>
      })
    )
  }
  return (

    <div className='list-container'>
      <h2 className='h1'>Search Recipes</h2>
      < br />
      <div >  <input
        type='search'
        name='search'
        onChange={handleSearch}
        placeholder='Search:'
      />
      </div>
      {modal && <div id='fullcard'>
        <div>
          <h2>{modalRecipe.name}</h2>
          <h3>Ingredients: </h3>
          {modalRecipe.ingredients.map(item => <li>{item}</li>)}
          <h3>Instructions: </h3>
          <ol>{modalRecipe.instructions.map(item => <li>{item}</li>)}</ol>-
        </div>
        <div>
          <button className='recipeButton' onClick={() => setConfirm(true)}>Delete</button>
          <button className='recipeButton' onClick={() => props.handleEdit(modalRecipe._id)}>Edit</button>
          <button className='recipeButton' onClick={() => setModal(false)}>Close</button>
          {confirm && <div id='confirmCard'>
            <h1>Delete Recipe</h1>
            <h3>Are yur sure you want to delete this recipe?</h3>
            <button className='confirmBtn' id='cancel' onClick={() => setConfirm(false)}>Cancel</button>
            <button className='confirmBtn' id='delete' onClick={() => { handleDelete(modalRecipe._id); setConfirm(false); setModal(false) }}>Delete</button>
          </div>}
        </div>
      </div>}
      <div className='page-control-container'>
        <div className='pageBtn btn' onClick={() => props.updateRecipePage(-1)}>🢢</div>
        {props.page != 0 ? <div className='btn' onClick={() => props.updateRecipePage(-1)}>{props.page}</div> : <div className='btn' onClick={() => props.updateRecipePage(1)}>{81}</div>}
        <div className='pageBtn btn' >{props.page + 1}</div>
        {props.page != 80 ? <div className='btn' onClick={() => props.updateRecipePage(1)}>{props.page + 2}</div> : <div className='btn' onClick={() => props.updateRecipePage(1)}>{1}</div>}
        <div className='pageBtn btn' onClick={() => props.updateRecipePage(1)}>🢣</div>
      </div>
      {/* <video controls width='250'><source src={bakingVideo} type='video/mp4' /></video> */}
      <h1 className='h1'>Recipe List</h1>
      <p>(Click on card to see more)</p>
      <div id='listbox'>
        {renderList()}
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
    search: state.search,
    display: state.display,
    page: state.page,

    editId: state.editId,
    editName: state.editName,
    editDescription: state.editDescription,
    editAuthor: state.editAuthor,
    editIngredients: state.editIngredients,
    editInstructions: state.editInstructions,

  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    handleEdit: (id) => dispatch(editRecipe(id)),
    handleInput: (e) => dispatch(handleInput(e.target)),
    updateRecipePage: (input) => {
      dispatch(updateRecipePage(input))
      dispatch(setDisplayRecipes())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)