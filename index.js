let lastJoke = "null";
let joke = 0;
let jokeCounter = 0;

function switchToNextJoke(){
    ++jokeCounter;
    loadSearchJoke()
}
function switchToLastJoke(){
    if (jokeCounter > 0){
        --jokeCounter;
        loadSearchJoke()
    }
}

function loadChuckJoke() {
        let selectedType = document.getElementById('selection').value;
        let erg = document.getElementById('erg');
        let xhttp = new XMLHttpRequest();
            erg.innerHTML = '';

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                joke = JSON.parse( this.responseText );
                if (joke.value === lastJoke) {
                    loadChuckJoke();
                }
                lastJoke = joke.value;
                console.log("answer.categoryJoke");
                console.log(joke);

                erg.innerHTML +=
                    '<h3>' + joke.value +'</h3>'
            }

        }
            if (selectedType === 'random'){
                xhttp.open("GET", "https://api.chucknorris.io/jokes/random", true);
            } else {
                xhttp.open("GET", "https://api.chucknorris.io/jokes/random?category="  + selectedType, true);
            }
            xhttp.send();
    }

function loadSearchJoke() {

    let searchedThing = document.getElementById('inputSearch').value;
    let erg = document.getElementById('erg');
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            joke = JSON.parse( this.responseText );

            lastJoke = joke.value;
            console.log("answer.loadSearch");
            console.log(joke);
            console.log(joke.value);


            if (joke.result.length != 0 && joke.result.length > jokeCounter){
                erg.innerHTML = '<h3>' + joke.result[jokeCounter].value + '</h3>'
            }

        }

    }
        xhttp.open("GET", "https://api.chucknorris.io/jokes/search?query=" + searchedThing, true);
        xhttp.send();
    }
