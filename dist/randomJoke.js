'use strict';
let previous = 'null';
function loadChuckJoke() {
    let selectedType = document.getElementById('selection').value;
    let result = document.getElementById('result');
    let xhttp = new XMLHttpRequest();
    result.innerHTML = '';
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let joke = JSON.parse(this.responseText);
            if (joke.value === previous) {
                loadChuckJoke();
            }
            previous = joke.value;
            console.log('answer.categoryJoke');
            console.log(joke);
            result.innerHTML += `<h3>${joke.value}</h3>`;
        }
    };
    if (selectedType === 'random') {
        xhttp.open('GET', 'https://api.chucknorris.io/jokes/random', true);
    }
    else {
        xhttp.open('GET', 'https://api.chucknorris.io/jokes/random?category=' + selectedType, true);
    }
    xhttp.send();
}
