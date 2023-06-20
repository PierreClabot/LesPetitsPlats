class cardFilter{
    constructor(data){
        this.data = data; // data -> objet avec ingredients, appareils, ustentiles 
        this.printFilter();

        this.observers = [];

        this.tagIngredients = []
        this.tagAppliances = []
        this.tagUstensiles = []
        this.eventFilter();

        
    }
    updateFilter(data){
        this.data = data;
        this.printFilter();
        this.eventFilter();
    }

    eventFilter(){
        document.querySelectorAll(".title-filter").forEach(domFilter=>{
            domFilter.addEventListener("click",(e)=>{
                e.stopImmediatePropagation();
                var target = e.target;
                while(target.classList.value.search("item-filter")<0)
                {
                    target = target.parentNode;
                }
                //target.querySelector(".list-filter");
                this.closeFilter(target)
                if(target.classList.value.search("open")<0){ // s'il n'est pas ouvert, on l'ouvre
                    target.classList.add("open");
                    let classInput;
                    let placeholderInput ;
                    if(target.classList.value.search("filter-ingredient")>0)
                    {
                        classInput = "searchIngredient";
                        placeholderInput = "Recherche un ingrédient";
                    }
                    else if(target.classList.value.search("filter-device")>0)
                    {
                        classInput = "searchDevice";
                        placeholderInput = "Recherche un appareil"
                    }
                    else if(target.classList.value.search("filter-utensil")>0)
                    {
                        classInput = "searchUstensil";
                        placeholderInput = "Recherche un ustensile"
                    }
                    target.querySelector(".title-filter").innerHTML = `<input type=text class='${classInput}' placeholder='${placeholderInput}'>
                                                                        <i class="fa-sharp fa-solid fa-chevron-up" style="color: #ffffff;"></i>`

                    document.querySelectorAll("input").forEach(input=>{
                        input.addEventListener("click",(e)=>{
                            e.stopPropagation();
                        })

                        input.addEventListener("keyup",(e)=>{
                            this.searchFilter(e);
                        })
                    })
                }
                else{ // Sinon on le ferme
                    target.classList.remove("open");
                    let affichage;
                    if(target.classList.value.search("filter-ingredient")>0)
                    {
                        affichage = "Ingrédients";
                    }
                    else if(target.classList.value.search("filter-device")>0)
                    {
                        affichage = "Appareils";
                    }
                    else if(target.classList.value.search("filter-utensil")>0)
                    {
                        affichage = "Ustensiles";
                    }
                    target.querySelector(".title-filter").innerHTML = `${affichage} <i class="fa-solid fa-chevron-down" style="color: #ffffff;"></i>`
                    
                }
                
                target = target.classList.value.replace("item-filter ",""); // récupérer le filtre target ( format filter-xxxxxx )
                

            })
        })
    }
    closeFilter(currentTarget){
        let filters = document.querySelectorAll(".item-filter");
        filters.forEach(item=>{
            if(item.classList.value != currentTarget.classList.value)
            {

                item.classList.remove("open");
                    let affichage;
                    if(item.classList.value.search("filter-ingredient")>0)
                    {
                        affichage = "Ingrédients";
                    }
                    else if(item.classList.value.search("filter-device")>0)
                    {
                        affichage = "Appareils";
                    }
                    else if(item.classList.value.search("filter-utensil")>0)
                    {
                        affichage = "Ustensiles";
                    }
                    item.innerHTML = `<div class="title-filter">
                                        <span>${affichage}</span>
                                        <i class="fa-solid fa-chevron-down" style="color: #ffffff;"></i>
                                        </div>
                                        <div class="list-filter">
                                        </div>`
            }
            
        })
        this.printFilter();
        this.eventFilter();
    }
    printFilter(){
        let listIngredients = "";
        let listAppliance = "";
        let listUstensiles = "";
        if(this.data){
            for(const ingredient of this.data.ingredients)
            {
                if(this.tagIngredients.includes(ingredient)) continue
                listIngredients += `<span class='tag tag-ingredient'>${ingredient}</span>`
            }

            for(const appliance of this.data.appliances)
            {
                if(this.tagAppliances.includes(appliance)) continue
                listAppliance += `<span class='tag tag-appliance'>${appliance}</span>`
            }

            for(const ustentil of this.data.ustensiles)
            {
                if(this.tagUstensiles.includes(ustentil)) continue
                listUstensiles += `<span class='tag tag-ustensil'>${ustentil}</span>`
            }

            document.querySelector(".filter-ingredient .list-filter").innerHTML = listIngredients;
            document.querySelector(".filter-device .list-filter").innerHTML = listAppliance;
            document.querySelector(".filter-utensil .list-filter").innerHTML = listUstensiles;

            this.addEventTag();
        }
        
    }

    searchFilter(event)
    {
        let saisie = event.target.value;
        let target = event.target ;
        if(target.classList.value.search("searchIngredient")>=0)
        {
            let affichage = "";
            for(const ingredient of this.data.ingredients)
            {
                if(ingredient.toLowerCase().indexOf(saisie.toLowerCase())>=0)
                {
                    affichage +=`<span class='tag tag-ingredient'>${ingredient}</span>`;
                }
            }
            document.querySelector(".filter-ingredient .list-filter").innerHTML = affichage;

        }
        else if(target.classList.value.search("searchDevice")>=0){
            let affichage = "";
            console.log(this.data);
            for(const device of this.data.appliances)
            {
                if(device.toLowerCase().indexOf(saisie.toLowerCase())>=0 )
                {
                    affichage +=`<span class='tag tag-appliance'>${device}</span>`;
                }
            }
            document.querySelector(".filter-device .list-filter").innerHTML = affichage;
        }
        else if(target.classList.value.search("searchUstensil")>=0){
            let affichage = "";
            for(const ustensile of this.data.ustensiles)
            {
                if(ustensile.toLowerCase().indexOf(saisie.toLowerCase())>=0 && !this.tagUstensiles.includes(ustensile))
                {
                    affichage +=`<span class='tag tag-ustensil'>${ustensile}</span>`;
                }
            }
            document.querySelector(".filter-utensil .list-filter").innerHTML = affichage;
        }
        this.addEventTag();

    }
    addEventTag(){
        document.querySelectorAll(".container-filter .tag").forEach(tag=>{
            tag.removeEventListener("click",(e)=>this.addTag(e)); 
            tag.addEventListener("click",(e)=>{
                e.stopImmediatePropagation();
                this.addTag(e);
            })
        })
    }
    addTag(event){
        let target = event.target;
        let classTarget = target.classList.value;
        let textTarget = target.innerText;
        target.remove();
        let tag = `<div class="item-tag ${classTarget}">
                        <span>${textTarget}</span>
                        <i class="delete-tag fa-regular fa-circle-xmark" style="color: #ffffff;"></i>
                    </div>`
        let wrapper = document.querySelector(".container-tag");
        wrapper.innerHTML += tag;
        this.addTagToSearch(classTarget,textTarget)
        document.querySelectorAll(".delete-tag").forEach(btnDelete=>{
            btnDelete.addEventListener("click",(e)=>this.removeTag(e))
        })

    }
    addTagToSearch(type,word){
        if(type.search("tag-ingredient")>=0)
        {
            this.tagIngredients.push(word)
        }
        else if(type.search("tag-appliance")>=0)
        {
            this.tagAppliances.push(word)
        }
        else if(type.search("tag-ustensil")>=0)
        {
            this.tagUstensiles.push(word)
        }

        let data = {
            ingredients:this.tagIngredients,
            appliances:this.tagAppliances,
            ustensiles:this.tagUstensiles
        }

        this.fire(data);
        
    }
    removeTag(event){
        let dom = event.target.parentNode;
        let type = "";
        let texte = "";
        if(dom.classList.value.search("ingredient")>=0)
        {
            type = "ingredient";
            let target = event.target.parentNode;
            texte = target.querySelector("span").innerText;
            document.querySelector(".filter-ingredient .list-filter").innerHTML += `<span class="tag tag-ingredient">${texte}</span>`
        }
        else if(dom.classList.value.search("appliance")>=0)
        {
            type = "appliance";
            let target = event.target.parentNode;
            texte = target.querySelector("span").innerText;
            document.querySelector(".filter-device .list-filter").innerHTML += `<span class="tag tag-appliance">${texte}</span>`
        }
        else if(dom.classList.value.search("ustensil")>=0)
        {
            type = "ustensile";
            let target = event.target.parentNode;
            texte = target.querySelector("span").innerText;
            document.querySelector(".filter-utensil .list-filter").innerHTML += `<span class="tag tag-appliance">${texte}</span>`
        }
        dom.remove();
        this.removeTagToSearch(type,texte)
        this.addEventTag();
        
    }

    removeTagToSearch(type,word){
        if(type=="ingredient"){
            this.removeItemArray(this.tagIngredients,word);
        }
        else if(type=="appliance"){
            this.removeItemArray(this.tagAppliances,word);
        }
        else if(type=="ustensile"){
            this.removeItemArray(this.tagUstensiles,word);
        }

        let data = {
            ingredients:this.tagIngredients,
            appliances:this.tagAppliances,
            ustensiles:this.tagUstensiles
        }

        this.fire(data);
        
        // console.log("this.tagIngredient",this.tagIngredients);
        // console.log("this.tagAppliances",this.tagAppliances);
        // console.log("this.tagUstensiles",this.tagUstensiles);
    }

    removeItemArray(array,element){
        let index = array.indexOf(element)
        array.splice(index,1);
        return array
    }

    subscribe(obj) {
        this.observers.push(obj);
    }

    unsubscribe(fn) {
        this.observers = this.observers.filter(
            (item) => {
                if (item !== fn) {
                    return item;
                }
                return -1;
            },
        );
    }

    fire(evt) { // envoyer l'event like au compteur global
        this.observers.forEach((item) => {
            item.updateTag(evt);
        });
    }

}
export default cardFilter;