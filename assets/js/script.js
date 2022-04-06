var requestUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=apple&app_id=c641384d&app_key=12cc98f49f7cf1147b452ba8421a5212";
fetch(requestUrl)
.then(function(response) {
    return response.json();
})
.then(function(data){
    console.log(data);
})
