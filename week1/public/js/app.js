/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/

//// Get request aanmaken
//var requestURL = 'https://pokeapi.co/api/v2/pokemon';
//var request = new XMLHttpRequest();
//request.open('GET', requestURL);
//
//// asynchrone omzetten naar JSON - wat te lezen is door js
//request.onload = function() {
//    var data = JSON.parse(request.responseText);
//    render(data)
//}
//
//// Api data opvragen
//request.send();


function getData(url, cb){
    // Get request aanmaken
    var request = new XMLHttpRequest();
    request.open('GET', url);

    // asynchrone omzetten naar JSON - wat te lezen is door js
    request.onload = function() {
        var data = JSON.parse(request.responseText);
        
        // roep ingevoerde callback functie aan met de data
        cb(data)
    }

    // Api data opvragen
    request.send();
}

function render(data) {
    console.log(data)
    var list = data.results;
    
    // wordt lijst van individuele pokemons
    var pokemonDetailsList = []

    //Normale inner html string
    //pokeBall.innerHTML = '<h2>' +  pokemon.name + '</h2>';
    for (var i = 0; i < list.length; i++){
        // per pokemon, haal detail info op en render die met de renderSingle function
        getData(list[i].url, getSingle)
    }
    
    
    function getSingle(pokemon){
        console.log(pokemon);
        pokemonDetailsList.push(pokemon);
        
        // als alle requests naar de details van alle pokemon klaar zijn, vuur dan de renderAll functie af
        if(pokemonDetailsList.length == list.length) {
            renderAll(pokemonDetailsList)
        }
    }
    
    function renderAll(all) {
        var pokeBall = document.querySelector("#app");
        
        // mdn array prototype sort
        all = all.sort(function(a, b){
            return a.order - b.order
        })
        console.log(all)
        //Template string
        for (var i = 0; i < all.length; i++){
            var pokemon = all[i];
            var secondType;
            console.log(pokemon)
            if (pokemon.types[1]) {
                secondType = `<h3 class="${pokemon.types[1].type.name  + 'circle'}">${pokemon.types[1].type.name}</h3>`;
            } else {
                secondType = '';
            }
            pokeBall.innerHTML += `
                <article>
                    <h2 class="${pokemon.types[0].type.name}"><span>${'#' + pokemon.id}</span>${pokemon.name}</h2>                
                    <h3 class="${pokemon.types[0].type.name + 'circle'} ">${pokemon.types[0].type.name}</h3>
                    ${secondType}
                    <img src="${pokemon.sprites.front_default}">
                </article>
                `
        }
        
    }
}


//vuur laad van data op begin van pagina 
getData('https://pokeapi.co/api/v2/pokemon?limit=10', render)


var offsetButtons = document.querySelectorAll("footer button");

for (var i = 0; i < offsetButtons.length; i++){
    offsetButtons[i].addEventListener('click', function(e){
        document.querySelector("#app").innerHTML = '';
        getData('https://pokeapi.co/api/v2/pokemon?limit=10&offset='+e.target.dataset.offset, render)
    })
}



