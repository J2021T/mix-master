var drinkID = '';
var apiKey1 = 'bcccbb55423c46609af992eb099157d1';
// // var apiKey2 = 'ef46178e8b904046bcbae1e0a70462e6';
// // var apiKey3 = '';
// // var apiKey4 = '';

var formSubmitHandler = function(event) {
    event.preventDefault();

    //get the liqour input value
    var btnClicked = document.activeElement;
    var liqourName = btnClicked.textContent;
    console.log(liqourName);

    getCocktail(liqourName);
};

document.querySelector('#liqourBtnEl').addEventListener('click', formSubmitHandler);

var getCocktail = function(liqourName) {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + liqourName + '&apiid=1').then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            var ranDrink = Math.floor(Math.random() * data.drinks.length);
            var drinkImgURL = data.drinks[ranDrink].strDrinkThumb;
            var drinkImage = document.querySelector('#image');
            var drinkNameEl = document.querySelector('#drinkName');
            var drinkID = data.drinks[ranDrink].idDrink;        
            
            drinkNameEl.textContent = data.drinks[ranDrink].strDrink;

            drinkImage.innerHTML = '<img src=' + drinkImgURL + '>';
            console.log(ranDrink);
            console.log(drinkNameEl);
            console.log(drinkImgURL);
            console.log(drinkID);

            getRecipe(drinkID);
        });      
    });
};

var getRecipe = function(drinkID) {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drinkID + '&apiid=1').then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            // var ingredientsEl = document.querySelector('#ingredients');
            var ingredients = [data.drinks[0].strIngredient1, data.drinks[0].strIngredient2, data.drinks[0].strIngredient3, data.drinks[0].strIngredient4, data.drinks[0].strIngredient5, data.drinks[0].strIngredient6, data.drinks[0].strIngredient7, data.drinks[0].strIngredient8, data.drinks[0].strIngredient9, data.drinks[0].strIngredient10, data.drinks[0].strIngredient11, data.drinks[0].strIngredient12, data.drinks[0].strIngredient13, data.drinks[0].strIngredient14, data.drinks[0].strIngredient15]
            var ingredientArr = ingredients.filter(function(value, index, arr) {
                return value !== null;
            });
            var measures = [data.drinks[0].strMeasure1, data.drinks[0].strMeasure2, data.drinks[0].strMeasure3, data.drinks[0].strMeasure4, data.drinks[0].strMeasure5, data.drinks[0].strMeasure6, data.drinks[0].strMeasure7, data.drinks[0].strMeasure8, data.drinks[0].strMeasure9, data.drinks[0].strMeasure10, data.drinks[0].strMeasure11, data.drinks[0].strMeasure12, data.drinks[0].strMeasure13, data.drinks[0].strMeasure14, data.drinks[0].strMeasure15]
            var measuresArr = measures.filter(function(value, index, arr) {
                return value !== null;
            });
            var recipe = data.drinks[0].strInstructions;
            var recipeEl = document.querySelector('#recipe');
            recipeEl.textContent = recipe;

            var recipeList = function(ingredient, measure) {
                var ingredientListEl = document.querySelector('#ingredients');
                var measureEl = document.createElement('h3');
                var ingredientEl = document.createElement('h3');

                ingredientEl.textContent = ingredient;
                measureEl.textContent = measure;
                

                ingredientListEl.appendChild(ingredientEl);
                ingredientListEl.appendChild(measureEl);
            };

            ingredientArr.forEach((ingredient, index) => {
                var measure = measuresArr[index];
                recipeList(ingredient, measure);
            });
        });
    });
};

var getIngredients = function() {
    fetch('https://api.spoonacular.com/food/ingredients/search?query=cranberryjuice&number=1&apiKey=' + apiKey1 + '').then(function(response) {
        if (response !== 200) {
            // modal saying the ingredients you entered cannot be found please try again
        } else {
            response.json().then(function(data) {
                // console.log(data);
                var ingredientID = data.results[0].id;
                console.log(ingredientID);
                return fetch('https://api.spoonacular.com/food/ingredients/' + ingredientID + '/information?amount=1&apiKey=' + apiKey1 + '').then(function(response) {
                    response.json().then(function(data) {
                        
                        var ingredientAisle = data.aisle;
                        var avgCost = data.estimatedCost.value;
                        console.log(ingredientAisle);
                        console.log(avgCost);
                    });
                });
            });
        };
    });
}

