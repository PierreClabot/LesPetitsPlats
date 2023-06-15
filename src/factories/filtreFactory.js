class FiltreFactory{
    constructor(data,type)
    {
        if(type === "ingredient"){
            // création ingrédient
            new FiltreIngredient(data);
        }
        else if(type === "appareil"){
           // création appareil 
           new FiltreAppareil(data);
        }
        else if(type === "ustensile"){
            // création ustenstile
            new FiltreUstensile(data);
        }
        else{
            throw "type inconnu";
        }
    }
}