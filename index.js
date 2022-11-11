let lastJoke = "null";
let joke = 0;

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
                    return;
                }
                lastJoke = joke.value;
                console.log("Die Antwort ist da");
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