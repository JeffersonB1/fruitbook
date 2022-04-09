var requestUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=apple&app_id=c641384d&app_key=12cc98f49f7cf1147b452ba8421a5212";
fetch(requestUrl)
.then(function(response) {
    return response.json();
})
.then(function(data){
    console.log(data);
})

var requestUrl = "https://api.edamam.com/api/nutrition-data?app_id=cd587999&app_key=d7e8f51d5b855c15479cee34dfba35a4&nutrition-type=cooking&ingr=1%20apple";
fetch(requestUrl)
.then(function(response) {
    return response.json();
})
.then(function(data) {
  console.log(data2);  
})

