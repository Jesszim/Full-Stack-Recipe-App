import { connect } from "react-redux"
import { handleInput } from '../redux/actions'
import { useNavigate } from "react-router-dom"
import appAPI from "../utils/API/appAPI"
import { useState } from "react"



const Form = (props) => {
    const [recipe, setRecipe] = useState({})
    let [ingredientCount, setIngredientCount] = useState(1)
    let [instructionCount, setInstructionCount] = useState(1)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        // e.preventDefault()
        let newRecipe = {
            name: props.name,
            description: props.description,
            author: props.author,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
        }
        appAPI.addRecipe(newRecipe)
        navigate(`/recipe-book/page-${props.page + 1}`)
    }

    const handleArrayInput = (e, index) => {
        let { value, name } = e.target
        if (!recipe[name]) recipe[name] = Array.from({ length: ingredientCount })
        let updatedArr = [...recipe[name]]
        updatedArr[index] = value
        setRecipe({
            ...recipe,
            [name]: updatedArr
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Recipe </h1>
            <input className="addinput"
                type="text"
                name='name'
                required
                placeholder="Name:"
                value={props.name}
                onChange={props.handleInput}
            />

            <textarea name="description" cols="53" rows="5"
                placeholder="Description:" value={props.description}
                onChange={props.handleInput}></textarea>
            <input
            className="addinput"
                type="text"
                name='author'
                placeholder="Author:"
                value={props.author}
                onChange={props.handleInput}
            />

<h3>Ingredients:</h3>
                    {Array.from({ length: ingredientCount }).map((e, i) => {
                        return (
                            <input type='text' 
                            className="addinput" name='ingredients' placeholder="ingredient" onChange={(e) => handleArrayInput(e, i)} />
                        )
                    })}
                    <div>
                         <button type='button' disabled={ingredientCount === 1} onClick={() => setIngredientCount(ingredientCount - 1)}>➖</button>   
                           <button type='button' disabled={ingredientCount === 10} onClick={() => setIngredientCount(ingredientCount + 1)}>➕</button>
</div>
<h3>Instructions:</h3>
                    {Array.from({ length: instructionCount }).map((e, i) => {
                        return (
                            <textarea name='instructions' placeholder="instruction"
                            cols="53" rows="3" onChange={(e) => handleArrayInput(e, i)} ></textarea> 
                        )
                    })}
                    <div>
                         <button type='button' disabled={instructionCount === 1} onClick={() => setInstructionCount(instructionCount - 1)}>➖</button>   
                           <button type='button' disabled={instructionCount === 10} onClick={() => setInstructionCount(instructionCount + 1)}>➕</button>
</div>
       

            <button type="submit">Add</button>
        </form>
    )
}


const mapStateToProps = (state) => {

    return {
        name: state.name,
        description: state.description,
        author: state.author,
        ingredients: state.ingredients,
        instructions: state.instructions,

    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        handleInput: (e) => dispatch(handleInput(e.target)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form) 