const express = require("express")
const mongoose = require("mongoose")
const Recipe = require("./model/recipe")
const app = express()
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static('public'));


const dburl = "mongodb+srv://aideninglis:recipe@recipedb.wzh2tr2.mongodb.net/"
mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true})


const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})



app.get("/recipes", (req, res) => {
    Recipe.find()
    .then(recipes => {
        res.render("recipes", {recipes})
    })
    .catch(err => {
        console.log(err)
    })
})

app.post("/recipes/new", (req, res) => {
    const newRecipe = new Recipe({ 
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        time: req.body.time
    });
    newRecipe.save()
    .then(() => {
        res.redirect("/recipes");
    })
    .catch(err => {
        console.log(err);
    });
});




// Route for updating the recipe (assuming use of PUT method, requiring method-override middleware)
app.put('/recipes/:id', (req, res) => {
    // Find the recipe with the given ID
    Recipe.findById(req.params.id)
    .then(recipe => {
        // Update the recipe
        recipe.title = req.body.title;
        recipe.ingredients = req.body.ingredients;
        recipe.instructions = req.body.instructions;
        recipe.time = req.body.time;
        // Save the updated recipe
        recipe.save()
        .then(() => {
            res.redirect('/recipes');
        })
        .catch(err => {
            console.log(err);
        });
    })
    .catch(err => {
        console.log(err);
    });
});

// route to bring up the edit form
app.get('/recipes/edit/:id', (req, res) => {
    // Find the recipe with the given ID
    Recipe.findById(req.params.id)
    .then(recipe => {
        res.render('recipes', { recipe });
    })
    .catch(err => {
        console.log(err);
    });
});


// Route for deleting a recipe
app.post('/recipes/delete/:id', (req, res) => {
    // Find the recipe with the given ID and delete it
    Recipe.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect('/recipes');
    })
    .catch(err => {
        console.log(err);
    });
});
