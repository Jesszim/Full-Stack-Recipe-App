import Recipe from "../db/models/recipe.js";
import seedData from "../../recipes-example-1.json" assert {type: 'json'}

const appControllers = {
  seedDB: (req, res) => {
    console.log(seedData)
    seedData.forEach(recipe => {
      let { Name: name, Author: author, Description: description, Ingredients: ingredients, Method: instructions } = recipe
      let newData = { name, description, author, ingredients, instructions }
      let newRecipe = new Recipe(newData)
      newRecipe.save()
    })
  },

  getAllRecipes: (req, res) => {
    Recipe.find().then((recipes) => {
      res.json(recipes)
    }).catch(err => console.log(err))
  },
  addRecipe: (req, res) => {
    let { name, description, author, ingredients, instructions } = req.body
    let data = { name, description, author, ingredients, instructions }
    let newRecipe = new Recipe(data)
    newRecipe.save().then(() => {
      Recipe.find()
        .then((recipes) => {
          res.json(recipes)
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  },
  deleteRecipe: (req, res) => {
    let { _id } = req.body
    Recipe.findByIdAndDelete({ _id })
      .then(() => {
        Recipe.find()
          .then((recipes) => {
            res.json(recipes)
          }).catch(err => console.log(err))
      }).catch(err => console.log(err))
  },
  updateRecipe: (req, res) => {
    let { _id, name, description, author, ingredients, instructions } = req.body
    let updatedRecipe = { name, description, author, ingredients, instructions }
    Recipe.findByIdAndUpdate({ _id }, updatedRecipe)
      .then(() => {
        Recipe.find()
          .then((recipes) => {
            res.json(recipes)
          }).catch(err => console.log(err))
      }).catch(err => console.log(err))
  },
  searchRecipes: (req, res) => {
    let { search } = req.query
    Recipe.find({ name: { $regex: `${search}`, $options: 'i' } })
      .then((recipes) => {
        res.json(recipes)
      }).catch(err => console.log(err))
  }
}

export default appControllers