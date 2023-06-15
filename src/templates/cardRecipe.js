/* eslint-disable no-tabs */
class cardRecipe {
    constructor(recipe) {
        this.recipe = recipe;
        this.wrapper = document.querySelector(".wrapper-recipes");
    }

    createCarte() {
        // Structure de la carte
		this.template = `
        <article class="recipe">
                <div class="photo-recipe">

                </div>
                <div class="informations-recipe">
                    <div class="header-details">
                        <h2>${this.recipe.name}</h2>
                        <div class="time-recipe">
                            <i class="fa-regular fa-clock" style="color: #000000;"></i>
                            <span class="libelle">${this.recipe.time} min</span>
                        </div>
                    </div>
                    <div class="details-recipe">
                        <div class="list-ingredients">
                            [#LIST_INGREDIENTS#]
                        </div>

                        <div class="description-recipe">
                           ${this.recipe.description}
                        </div>
                    </div>
                </div>
            </article>
            `;
            
            // on parcourt les ingrédients et on créé leur dom html
            let listIngredients = "";
            for(let i = 0;i<this.recipe.ingredients.length;i++)
            {
                listIngredients += this.createIngredient(this.recipe.ingredients[i]);
            }

            this.template = this.template.replace("[#LIST_INGREDIENTS#]", listIngredients);

            this.wrapper.innerHTML += this.template;

        return this.template;
    }

    createIngredient(ingredient)
    {
        // On récupérère le nom et la quantité de l'ingrédient, si aucun, afficher chaine vide
        let quantityIngredient = ingredient.quantity ? ingredient.quantity : "" ;
        let unitIngredient = ingredient.unit ? ingredient.unit : "" ;
        let affichageIngredient = `<div class="row-ingredient">
                                        <span class="important">${ingredient.ingredient}</span>
                                        [#QUANTITY#]
                                    </div>`;
        if(quantityIngredient){
            affichageIngredient = affichageIngredient.replace("[#QUANTITY#]",`<span>: ${quantityIngredient} ${unitIngredient}</span>`)
        }
        else{
            affichageIngredient = affichageIngredient.replace("[#QUANTITY#]",``)
        }
        return affichageIngredient ;
    }

}
export default cardRecipe
