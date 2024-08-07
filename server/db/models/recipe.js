import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
name:{
  type: String,
  required: true,
  unique: true
},
description:{
  type: String,
},
author:{
  type: String
},
ingredients: [{
  type: String,
  // required: true
}],
instructions: [{
  type: String ,
  // required: true
}],
})

const Recipe = mongoose.model("Recipe", recipeSchema)

export default Recipe