var search = document.getElementById("search");
var fruit = document.getElementById("fruit");
var fruitSearch = document.getElementById("fruit-search")
var currentFruitContainer = document.getElementById("current-fruit-container");
var currentFruitPicture = document.getElementById("current-fruit-picture");
var displayedFruit = document.getElementById("displayed-fruit");
var displayFruit = document.getElementById("displayFruit");
var diplayFruitPicture = document.getElementById("diplayFruitPicture");
var myFruit = document.getElementById("myFruit");
var deleteButton = document.getElementById("deleteButton");
var recipeInfo = document.getElementById("recipeInfo1");
var recipe = document.getElementById("recipe1");





var searchHandler = function(event) {
    event.preventDefault();

    var searchedFruit = fruit.value.trim();

    if (searchedFruit) {
        findFruitName(searchedFruit);
        findPicture(searchedFruit);
        fruitRecipes(searchedFruit);
        fruit.textContent = "";
        fruit.value = "";

    } else {
        alert("Please enter a fruit");
    }
};





var addFruit = function(searchName) {
    currentFruitContainer.textContent = "";
    displayedFruit.textContent = searchName;
    var saveFruit = document.createElement("button");
    saveFruit.textContent = searchName;
    saveFruit.classList.add("button", "is-medium", "is-fullwidth", "is-primary", "is-outlined", "is-capitalized");
    saveFruit.addEventListener("click", function () {
        displayedFruit.textContent = this.textContent;
        findFruitName(this.textContent);
        findPicture(this.textContent);
        fruitRecipes(this.textContent);
    });
    myFruit.append(saveFruit);
};







var findFruitName = function(searchedFruit) {
    var apiFruitName = "https://api.edamam.com/api/nutrition-data?app_id=cd587999&app_key=d7e8f51d5b855c15479cee34dfba35a4&nutrition-type=cooking&ingr=1%20" + searchedFruit;

    fetch(apiFruitName).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var calories = data.totalWeight;
                findFruitData(searchedFruit);
            })
        }
    })
};







var findPicture = function (searchedFruit) {
    var apiPictureData = "https://pixabay.com/api/?key=26596335-9f44e05b98544ec5287143395&q=" + searchedFruit + "&image_type=photo";

    fetch(apiPictureData).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var picture = data.hits[0].largeImageURL;
                diplayFruitPicture.innerHTML = "";

                var currentFruitIcon = data.hits[0].largeImageURL;
                var fruitIcon = document.createElement("img")
                fruitIcon.setAttribute("src", currentFruitIcon);
                fruitIcon.classList.add("icon", "is-medium");
                diplayFruitPicture.appendChild(fruitIcon);
            })
        }
    })
};








var findFruitData = function (searchedFruit) {
    var apiFruitData = "https://api.edamam.com/api/nutrition-data?app_id=cd587999&app_key=d7e8f51d5b855c15479cee34dfba35a4&nutrition-type=cooking&ingr=1%20" + searchedFruit;

    fetch(apiFruitData).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                displayFruit.innerHTML = "";

                var fruitCalories = data.calories;
                var calories = document.createElement("p")
                calories.textContent = "Calories: " + fruitCalories;
                calories.classList.add("infoContent");
                displayFruit.appendChild(calories);

                var fruitFat = data.totalNutrients.FAT.quantity;
                var fat = document.createElement("p")
                fat.textContent = "Total Fat: " + " " + fruitFat + " " + "g";
                fat.classList.add("infoContent");
                displayFruit.appendChild(fat);

                var fruitCarbs = data.totalNutrients.CHOCDF.quantity;
                var carbs = document.createElement("p")
                carbs.textContent = "Carbohydrates: " + " " + fruitCarbs + " " + "g";
                carbs.classList.add("infoContent");
                displayFruit.appendChild(carbs);

                var fruitFiber = data.totalNutrients.FIBTG.quantity;
                var fiber = document.createElement("p");
                fiber.classList.add("infoContent");
                fiber.textContent = "Fiber: " + " " + fruitFiber + " " + "g";
                displayFruit.appendChild(fiber);

                var fruitSugar = data.totalNutrients.SUGAR.quantity;
                var sugar = document.createElement("p");
                sugar.classList.add("infoContent");
                sugar.textContent = "Sugar: " + " " + fruitSugar + " " + "g";
                displayFruit.appendChild(sugar);

                var fruitProtein = data.totalNutrients.PROCNT.quantity;
                var protein = document.createElement("p");
                protein.classList.add("infoContent");
                protein.textContent = "Protein: " + " " + fruitProtein + " " + "g";
                displayFruit.appendChild(protein);

            });
        } else {
            alert("Error: Fruit Not Found");
        }
    })
        .catch(function (error) {
            alert("Unable to Connect");
        })
};





var saveIntoStorage = function () {
    var savedFruit = JSON.parse(localStorage.getItem("fruits"))  || [];
    savedFruit.push(fruit.value);
    localStorage.setItem("fruits", JSON.stringify(savedFruit));
};






var displaySavedFruit = function () {
    var savedFruit = JSON.parse(localStorage.getItem("fruits"))  || [];
    for (var i = 0; i < savedFruit.length; i++) {
        var savedFruitButton = document.createElement("button");
        savedFruitButton.textContent = savedFruit[i];
        savedFruitButton.classList.add("button", "is-medium", "is-fullwidth", "is-primary", "is-outlined", "is-capitalized");
        savedFruitButton.addEventListener("click", function () {
        displayedFruit.textContent = this.textContent;
        findFruitName(this.textContent);
        findPicture(this.textContent);
        fruitRecipes(this.textContent);
        });
        myFruit.append(savedFruitButton);
    }

};




displaySavedFruit();
search.addEventListener("click", function () {
    findFruitName(fruit.value);
    findPicture(fruit.value);
    fruitRecipes(fruit.value);
    addFruit(fruit.value);
    saveIntoStorage();
});






var removeFruit = function () {
    localStorage.removeItem("fruits");
    myFruit.innerHTML = "";
};

deleteButton.addEventListener("click", removeFruit);







var fruitRecipes = function(searchedFruit) {
    var apiFruitData = "https://api.edamam.com/api/recipes/v2?type=public&q=" + searchedFruit + "&app_id=c641384d&app_key=12cc98f49f7cf1147b452ba8421a5212";

    fetch(apiFruitData).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

    for (let i = 0; i < 5; i++) {

        var recipe = document.getElementById(`recipe${i + 1}`)
        recipe.innerHTML = "";

        var recipeInfo = document.getElementById(`recipeInfo${i + 1}`);
        recipeInfo.innerHTML = "";


        var recipeName = document.createElement("div")
        var recipeEl = data.hits[i + 1].recipe.label;
        recipeName.textContent = recipeEl;
        document.getElementById(`recipe${i + 1}`).appendChild(recipeName);

        var currentFruitIcon = data.hits[i + 1].recipe.ingredients[0].image;
        var recipeIcon = document.createElement("img")
        recipeIcon.setAttribute("src", currentFruitIcon);
        recipeIcon.classList.add("icon", "is-large");
        document.getElementById(`recipeInfo${i + 1}`).appendChild(recipeIcon);

        var recipeType = document.createElement("p");
        recipeType.textContent = "Type of Dish:" + " " + data.hits[i + 1].recipe.dishType;
        document.getElementById(`recipeInfo${i + 1}`).appendChild(recipeType);

        var recipeIngredients = document.createElement("p")
        recipeIngredients.textContent = "Ingredients:" + " " + data.hits[i + 1].recipe.ingredientLines;
        document.getElementById(`recipeInfo${i + 1}`).appendChild(recipeIngredients);

        var recipeUrl = document.createElement("p")
        recipeUrl.textContent = "Source:" + " " + data.hits[i + 1].recipe.url;
        document.getElementById(`recipeInfo${i + 1}`).appendChild(recipeUrl);
    
        }
        
    })
    }
});
}


