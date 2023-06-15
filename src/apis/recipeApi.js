import recipes from "../data/data.js"
class dataRecipe{ // recipeList
    constructor(){
        this.data = recipes;
    }

    getData(){
        return this.data;
    }
}

export default dataRecipe;