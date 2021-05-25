var drinkID = '';
var apiKey1 = 'bcccbb55423c46609af992eb099157d1';
var apiKey2 = 'ef46178e8b904046bcbae1e0a70462e6';
var apiKey3 = '';
var apiKey4 = '';
var drinksArr = [];
var idsArr = [];

// get saved cocktails from storage
var getCocktailsFromStorage = function() {
    drinksArr = [];
    idsArr = [];
    document.querySelector('#savedCocktails').innerHTML = '';
    
    var savedCocktailNames = JSON.parse(localStorage.getItem('names'));
    var savedCocktailIDs = JSON.parse(localStorage.getItem('ids'));

    if (savedCocktailNames !== null) {
        drinksArr = savedCocktailNames;
        idsArr = savedCocktailIDs;

        // remove duplicate drink names
        var uniqueDrinks = new Set(drinksArr);
        drinksArr = [...uniqueDrinks];

        // remove duplicate drink ids
        var uniqueIDs = new Set(idsArr);
        idsArr = [...uniqueIDs];
    };

    drinksArr.forEach((drinkName, index) => {
        var drinkID = idsArr[index];
        console.log(drinkID);
        console.log(drinkName);
        var savedForm = document.querySelector('#savedCocktails');
        var drinkButton = document.createElement('button');
        drinkButton.setAttribute('id', drinkID);
        drinkButton.textContent = drinkName;
        savedForm.appendChild(drinkButton);
    });
};

getCocktailsFromStorage();

// if liqour button clicked
var formSubmitHandler = function(event) {
    event.preventDefault();

    //get the liqour input value
    var btnClicked = document.activeElement;
    var liqourName = btnClicked.textContent;

    getCocktail(liqourName);
};

// if saved cocktail button clicked
var savedFormSubmitHandler = function(event) {
    event.preventDefault();

    //get the liqour input value
    var btnClicked = document.activeElement;
    var drinkID = btnClicked.id;

    getSavedCocktailInfo(drinkID);
};

// if ingredient button clicked
var ingredientFormHandler = function(event) {
    event.preventDefault();


    // get ingredient input value and convert to no spaces
    var btnClicked = document.activeElement;
    var ingredientName = btnClicked.textContent;
    var ingredient = ingredientName.toLowerCase().replace(/\s+/g,'').trim();
    console.log(ingredient);
        if (ingredient === 'tabascosauce') {
            var ingredient = 'tabasco';
        } else if (ingredient === 'dryvermouth') {
            var ingredient = 'vermouth';
        } 
        getIngredients(ingredient);     
};

// save a cocktail to favorites
var saveCocktailHandler = function(event) {
    event.preventDefault();

    // add cocktail name and id to arrays
    var btnClicked = document.activeElement;
    var drinkName = btnClicked.textContent;
    console.log(drinksArr);
    console.log(idsArr);
    
    drinksArr.push(drinkName);
    idsArr.push(btnClicked.id);

    // store the cocktail name and id
    localStorage.setItem('names', JSON.stringify(drinksArr));
    localStorage.setItem('ids', JSON.stringify(idsArr));

    getCocktailsFromStorage();
};

// listen for liqour button clicked
document.querySelector('#liqourBtnEl').addEventListener('click', formSubmitHandler);

// listen for ingredient button clicked
document.querySelector('#storeLoc').addEventListener('click', ingredientFormHandler);

// listen for save button clicked
document.querySelector('#drinkName').addEventListener('click', saveCocktailHandler);

// listen for saved cocktail button clicked
document.querySelector('#savedCocktails').addEventListener('click', savedFormSubmitHandler);

// get the cocktail info
var getCocktail = function(liqourName) {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + liqourName + '&apiid=1').then(function(response) {
        response.json().then(function(data) {
            var ranDrink = Math.floor(Math.random() * data.drinks.length);
            var drinkImgURL = data.drinks[ranDrink].strDrinkThumb;
            console.log(drinkImgURL);
            var drinkImage = document.querySelector('#image');
            var drinkNameEl = document.querySelector('#drinkName');
            var saveBtnEl = document.createElement('button');
            var drinkID = data.drinks[ranDrink].idDrink;  

            saveBtnEl.setAttribute('id', '' + drinkID + '');
            saveBtnEl.setAttribute('class', 'saveBtn');

            drinkNameEl.innerHTML = '<div>Click the button below to save to favorites</div>';

            drinkNameEl.appendChild(saveBtnEl);
            
            saveBtnEl.innerHTML = data.drinks[ranDrink].strDrink;

            drinkImage.innerHTML = '<img id="' + drinkID + '" src="' + drinkImgURL + '/preview"/>';
            
            getRecipe(drinkID);
        });      
    });
};

// function to get saved cocktail drinkId
var getSavedCocktailInfo = function(drinkID) {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drinkID + '&apiid=1').then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            var drinkImgURL = data.drinks[0].strDrinkThumb;
            var drinkImage = document.querySelector('#image');
            var drinkNameEl = document.querySelector('#drinkName');
            var drinkID = data.drinks[0].idDrink; 
            
            drinkNameEl.textContent = data.drinks[0].strDrink;

            drinkImage.innerHTML = '<img src="' + drinkImgURL + '/preview">';
            
            getRecipe(drinkID);
        });      
    });
};


// get the recipe ingredients, measures, and directions
var getRecipe = function(drinkID) {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drinkID + '&apiid=1').then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            var ingredients = [data.drinks[0].strIngredient1, data.drinks[0].strIngredient2, data.drinks[0].strIngredient3, data.drinks[0].strIngredient4, data.drinks[0].strIngredient5, data.drinks[0].strIngredient6, data.drinks[0].strIngredient7, data.drinks[0].strIngredient8, data.drinks[0].strIngredient9, data.drinks[0].strIngredient10, data.drinks[0].strIngredient11, data.drinks[0].strIngredient12, data.drinks[0].strIngredient13, data.drinks[0].strIngredient14, data.drinks[0].strIngredient15]
            var ingredientArr = ingredients.filter(function(value, index, arr) {
                return value !== null;
            });
            var measures = [data.drinks[0].strMeasure1, data.drinks[0].strMeasure2, data.drinks[0].strMeasure3, data.drinks[0].strMeasure4, data.drinks[0].strMeasure5, data.drinks[0].strMeasure6, data.drinks[0].strMeasure7, data.drinks[0].strMeasure8, data.drinks[0].strMeasure9, data.drinks[0].strMeasure10, data.drinks[0].strMeasure11, data.drinks[0].strMeasure12, data.drinks[0].strMeasure13, data.drinks[0].strMeasure14, data.drinks[0].strMeasure15]
            var measuresArr = measures.filter(function(value, index, arr) {
                return value !== null;
            });
            var recipe = data.drinks[0].strInstructions;
            var recipeEl = document.createElement('span');
            var recipeContainer = document.querySelector('#recipe');
            recipeEl.textContent = " -- " + recipe;
            recipeContainer.appendChild(recipeEl);

            var recipeList = function(ingredient, measure) {
                var ingredientListEl = document.querySelector('#ingredients');
                var ingredientStoreEl = document.querySelector('#storeLoc');
                var measureEl = document.createElement('span');
                var ingredientEl = document.createElement('h3');
                var storeIngredient = document.createElement('button');
                storeIngredient.setAttribute('id', ingredient);

                measureEl.textContent = ' -- ' + measure;
                ingredientEl.textContent = ingredient;
                storeIngredient.textContent = ingredient;
                
                
                ingredientStoreEl.appendChild(storeIngredient);
                ingredientListEl.appendChild(ingredientEl);
                ingredientEl.appendChild(measureEl);
            };

            ingredientArr.forEach((ingredient, index) => {
                var measure = measuresArr[index];                
                recipeList(ingredient, measure);               
            });
        });
    });
};


// get ingredient info for cocktail
var getIngredients = function(ingredient) {
    fetch('https://api.spoonacular.com/food/ingredients/search?query=' + ingredient + '&number=1&apiKey=' + apiKey2 + '').then(function(response) {
        response.json().then(function(data) {
            if (data) {
                var ingredientID = data.results[0].id;
                console.log(ingredientID);
                return fetch('https://api.spoonacular.com/food/ingredients/' + ingredientID + '/information?amount=1&apiKey=' + apiKey2 + '').then(function(response) {
                    response.json().then(function(data) {
                        console.log(data);
                        var ingredientAisle = data.aisle;
                        var avgCost = data.estimatedCost.value;
                        var ingredientAisleEl = document.createElement('span');
                        var avgCostEl = document.createElement('span');

                        ingredientAisleEl.textContent = ingredientAisle;
                        avgCostEl.textContent = '$' + avgCost + '';

                        console.log(ingredientAisleEl);
                        console.log(avgCostEl);
                    });
                });
            } else if (results.offset === 0) {
                alert('Cannot find the ingredient, please send us a message so we can add it to our grocery list.');
            }
        });
    });
};

