class utils{
    static checkFilter(dataRecipe){
        // On récupère les ingrédients/ustentils/appareils des recettes trouvées
        let dataIngredients = dataRecipe.ingredients;
        let dataUstentils = dataRecipe.ustentils;
        let dataAppliance = dataRecipe.appliance;
        for(const ingredient of dataIngredients)
        {
            let ingredientFind = false;
            for(const filterIngredient of this.filterIngredients)
            {
                if(filterIngredient == ingredient.ingredient)
                {
                    ingredientFind = true;
                    
                }
            }
            if(!ingredientFind){ // si on ingrédient non trouvé, on l'ajoute à la liste de filtre
                this.filterIngredients.push(ingredient.ingredient);
            }
        }
        
    }
}

export default utils;