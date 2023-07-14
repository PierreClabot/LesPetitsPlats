import dataRecipe from "../apis/recipeApi.js"
import cardRecipe from "../templates/cardRecipe.js";
import cardFilter from "../templates/cardFilter.js";

class App{
    constructor()
    {
        this.data = new dataRecipe();
        this.data = this.data.getData();

        

        this.wrapper = document.querySelector(".wrapper-recipes");
        this.filterIngredients = [];
        this.filterAppliance = [];
        this.filterUstensiles = [];
        this.tags={
            ingredients : [],
            appliances : [],
            ustensiles : []
        }
        this.dataFilter = {
            ingredients : this.filterIngredients,
            appliances : this.filterAppliance,
            ustensiles : this.filterUstensiles
        }
        this.filter = new cardFilter()

        this.filter.subscribe(this);

        this.searchRecipe = this.searchRecipe.bind(this);
        document.querySelector(".input-search").addEventListener("keyup",()=>{
            if(document.querySelector(".input-search").value.length >=3)
            {
                this.clear();
                this.tags = this.getTags();
                this.searchRecipe(this.tags);
            }
            else{
                this.clear();
                this.searchRecipe(this.tags);
            }
        })

        this.main();
    }

    main(){
        this.displayAllRecipe();
    }

    resetFilter(){
        this.filterIngredients = [];
        this.filterAppliance = [];
        this.filterUstensiles = [];
    }
    searchRecipe(dataFilter){
        let saisie = document.querySelector(".input-search").value; // saisie utilisateur
        this.resetFilter();
        for(let i=0;i<this.data.length;i++)
        {
            // si on a saisit quelque chose
            if(document.querySelector(".input-search").value.length >= 4)
            {
                //console.log(this.searchIngredient(saisie,this.data[0].ingredients))
                if(this.data[i].name.toUpperCase().search(saisie.toUpperCase())>=0 || 
                this.data[i].description.search(saisie)>=0 || 
                this.searchIngredient(saisie,this.data[i].ingredients))
                {
                    let data ;
                    if(!dataFilter.ingredients.length && !dataFilter.appliances.length && !dataFilter.ustensiles.length)
                    {

                        const recipe = new cardRecipe(this.data[i]);
                        recipe.createCarte();
                        this.checkFilter(this.data[i]);
                    }
                    else{

                        let checkTag = this.checkTag(dataFilter,this.data[i]);

                        if(checkTag)
                        {
                            const recipe = new cardRecipe(this.data[i]);
                            recipe.createCarte();
                            this.checkFilter(this.data[i]);
                        }

                    }
                    data = { // on peuple les filtres
                        ingredients : this.filterIngredients,
                        appliances : this.filterAppliance,
                        ustensiles : this.filterUstensiles
                    }
                    
                    this.filter.updateFilter(data);

                }
            }
            else{

                this.tags = this.getTags();
                if(this.checkTag(this.tags,this.data[i])){
                    const recipe = new cardRecipe(this.data[i]); 
                    recipe.createCarte();
                    this.checkFilter(this.data[i]);

                    let data = { // on peuple les filtres
                        ingredients : this.filterIngredients,
                        appliances : this.filterAppliance,
                        ustensiles : this.filterUstensiles
                    }
                    this.filter.updateFilter(data);
                    
                }
               
            }
            
        }        
    }
    getTags(){
        let tags ={
            ingredients : [],
            appliances : [],
            ustensiles : []
        }
        if(document.querySelectorAll(".item-tag.tag-ingredient"))
        {
            document.querySelectorAll(".item-tag.tag-ingredient").forEach(tagIngredient=>{
                tags.ingredients.push(tagIngredient.innerText);
            })
        }
        if(document.querySelectorAll(".item-tag.tag-appliance"))
        {
            document.querySelectorAll(".item-tag.tag-appliance").forEach(tagAppliance=>{
                tags.appliances.push(tagAppliance.innerText);
            })
        }
        if(document.querySelectorAll(".item-tag.tag-ustensil"))
        {
            document.querySelectorAll(".item-tag.tag-ustensil").forEach(tagUstensil=>{
                tags.ustensiles.push(tagUstensil.innerText);
            })
        }
        return tags;
    }

    updateTag(data)
    {
        this.clear();
        this.searchRecipe(data);
    }
    checkTag(dataFilter,dataRecipe){

        let ingredients = dataFilter.ingredients;
        let appliances = dataFilter.appliances;
        let ustensiles = dataFilter.ustensiles;
        let boolTagIngredient = true;
        let boolTagAppliance = true;
        let boolTagUstensil = true;
        for(const ingredient of ingredients){ // On parcourt les ingrédients des tags
            let boolFindIngredient = false;
            for(const ingredientRecipe of dataRecipe.ingredients) // on parcourt les ingrédients de la recette
            {
                if(ingredientRecipe.ingredient.toUpperCase() == ingredient.toUpperCase()) // Si on trouve l'ingrédient tag dans la recette -> bool à vrai
                {
                    boolFindIngredient = true;
                }
            }
            if(!boolFindIngredient){ // si bool toujours à faux, on a pas trouvé l'ingrédient dans la recette -> on sort
                boolTagIngredient = false;
                break;
            }
        }
        for(const appliance of appliances){ // On parcourt les ingrédients des tags
            let boolFindAppliance = false;
  
            if(dataRecipe.appliance.toUpperCase() == appliance.toUpperCase()) // Si on trouve l'ingrédient tag dans la recette -> bool à vrai
            {
                boolFindAppliance = true;
            }

            if(!boolFindAppliance){ // si bool toujours à faux, on a pas trouvé l'ingrédient dans la recette -> on sort
                boolTagAppliance = false;
                break;
            }
        }
        for(const ustensil of ustensiles){ // On parcourt les ingrédients des tags
            let boolFindUstensil = false;
            
            for(const ustensilRecipe of dataRecipe.ustensils) // on parcourt les ingrédients de la recette
            {
               
                if(ustensilRecipe.toUpperCase() == ustensil.toUpperCase()) // Si on trouve l'ingrédient tag dans la recette -> bool à vrai
                {
                    boolFindUstensil = true;
                }
            }
            if(!boolFindUstensil){ // si bool toujours à faux, on a pas trouvé l'ingrédient dans la recette -> on sort
                boolTagUstensil = false;
                break;
            }
        }

        if(boolTagAppliance && boolTagIngredient && boolTagUstensil)
        {
            return true
        } // else
        return false

    }
    checkFilter(dataRecipe){
        // On récupère les ingrédients/ustentils/appareils des recettes trouvées
        let dataIngredients = dataRecipe.ingredients;
        let dataUstentils = dataRecipe.ustensils;
        let dataAppliance = dataRecipe.appliance;
        for(const ingredient of dataIngredients) // on parcourt les ingrédients de la recette
        {
            let boolFind = false;
            for(const filterIngredient of this.filterIngredients) // On parcourt les ingredients déjà enregistré
            {
                if(filterIngredient.toUpperCase() == ingredient.ingredient.toUpperCase())
                {
                    boolFind = true;   // l'ingrédient est déjà présent dans la liste des filtres ingrédients
                }
                
            }
            if(!boolFind){ // si on ingrédient non trouvé, on l'ajoute à la liste de filtre
                this.filterIngredients.push(ingredient.ingredient); // @REMPLACE set???
            }
        }

        for(const ustensile of dataUstentils) // on parcourt les ingrédients de la recette
        {
            let boolFind = false;
            for(const filterUstensile of this.filterUstensiles) // On parcourt les ingredients déjà enregistré
            {
                if(filterUstensile.toUpperCase() == ustensile.toUpperCase())
                {
                    boolFind = true;   // l'ingrédient est déjà présent dans la liste des filtres ingrédients
                }
            }
            if(!boolFind){ // si on ingrédient non trouvé, on l'ajoute à la liste de filtre
                this.filterUstensiles.push(ustensile);
            }
        }

        
        let boolFind = false;
        for(const filterAppliance of this.filterAppliance) // On parcourt les ingredients déjà enregistré
        {
            if(filterAppliance.toUpperCase() == dataAppliance.toUpperCase())
            {
                boolFind = true;   // l'ingrédient est déjà présent dans la liste des filtres ingrédients
            }

        }
        if(!boolFind){ // si on ingrédient non trouvé, on l'ajoute à la liste de filtre
            let booVerifAffiche = false;
            document.querySelectorAll(".container-tag .tag-appliance").forEach(tag=>{
                if(tag.innerText == dataAppliance){
                    booVerifAffiche = true;
                }
            })
            if(!booVerifAffiche)
            {
                this.filterAppliance.push(dataAppliance); 
            }
        }
        
    }

    searchIngredient(saisie,arrayIngredients)
    {
        for(const ingredient of arrayIngredients) // recherche %saisie%
        {
            if(ingredient.ingredient.toUpperCase().search(saisie.toUpperCase()) >= 0){
                return true;
            }
        }

        return false;
    }

    searchRecipeV2(dataFilter)
    {
        let saisie = document.querySelector(".input-search").value;
        this.resetFilter();
        this.data.forEach(dataRecipe =>{
            if(saisie.length >= 4)
            {
                if(dataRecipe.name.search(saisie)>0 || dataRecipe.description.search(saisie)>0 || dataRecipe.ingredients.some(this.searchIngredientsV2.bind(null,saisie)))
                {

                    let data ;
                        if(!dataFilter.ingredients.length && !dataFilter.appliances.length && !dataFilter.ustensiles.length)
                        {
    
                            const recipe = new cardRecipe(dataRecipe);
                            recipe.createCarte();
                            this.checkFilter(dataRecipe);
                        }
                        else{

                            let checkTag = this.checkTag(dataFilter,dataRecipe);
    
                            if(checkTag)
                            {
                                const recipe = new cardRecipe(dataRecipe);
                                recipe.createCarte();
                                this.checkFilter(dataRecipe);
                            }
    
                        }
                        data = { // on peuple les filtres
                            ingredients : this.filterIngredients,
                            appliances : this.filterAppliance,
                            ustensiles : this.filterUstensiles
                        }
                        
                        //const filter = new cardFilter(data)
                        this.filter.updateFilter(data);
                }
            }
            else{
                this.tags = this.getTags();
                if(this.checkTag(this.tags,dataRecipe)){

                    const recipe = new cardRecipe(dataRecipe); 
                    recipe.createCarte();
                    this.checkFilter(dataRecipe);

                    let data = { // on peuple les filtres
                        ingredients : this.filterIngredients,
                        appliances : this.filterAppliance,
                        ustensiles : this.filterUstensiles
                    }

                    this.filter.updateFilter(data);
                    
                }
            }
            
        })
            
    }

    searchIngredientsV2(saisie,nameIngredient){
        return nameIngredient.ingredient.search(saisie)>0
    }

    

    displayAllRecipe(){
        for(let i=0;i<this.data.length;i++)
        {
            const recipe = new cardRecipe(this.data[i]);
            recipe.createCarte();
            this.checkFilter(this.data[i]);
        }
        let data = { // on peuple les filtres
            ingredients : this.filterIngredients,
            appliances : this.filterAppliance,
            ustensiles : this.filterUstensiles
        }
        
        this.filter.updateFilter(data);
    }

    clear(){
        this.wrapper.innerHTML = "";
    }


}

const app = new App();
