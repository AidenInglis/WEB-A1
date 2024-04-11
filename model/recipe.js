const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    ingredients: {
        type: String,
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    }
})

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;