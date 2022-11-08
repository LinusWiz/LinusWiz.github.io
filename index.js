    let timeToReset = 0;

    let selectedType = document.getElementById('selection')

    function loadChuckJoke() {
        let erg = document.getElementById('erg');
        let xhttp = new XMLHttpRequest();
        if (timeToReset > 2){
            timeToReset = 0;
            erg.innerHTML = '';
        }
        ++timeToReset

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                console.log("Die Antwort ist da");
                let joke = JSON.parse( this.responseText );
                console.log(joke);

                erg.innerHTML +=
                    '<h3>' + joke.value +'</h3>'
            }

        }
            xhttp.open("GET", "https://api.chucknorris.io/jokes/" + selectedType, true);
            xhttp.send();
    }