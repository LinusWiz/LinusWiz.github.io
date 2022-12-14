'use strict';
let jokeCounter = 0;
function switchToDifferentJoke(direction) {
    if (direction === 'right') {
        ++jokeCounter;
    }
    else {
        console.log(jokeCounter);
        if (jokeCounter > 0) {
            --jokeCounter;
        }
    }
    loadSearchJoke();
}
class joke {
}
class jokeList {
}
function loadSearchJoke(isNewQuery = false) {
    if (isNewQuery) {
        jokeCounter = 0;
    }
    let index = 0;
    if (screen.width > 800) {
        index = 1;
    }
    let searchQuery = ' ' + document.getElementsByClassName('inputSearch')[index].value;
    let result = document.getElementById('result');
    let resultBox = document.getElementById('resultBox');
    let xhttp = new XMLHttpRequest();
    result.innerHTML = '';
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let joke = JSON.parse(this.responseText);
            console.log('answer.loadSearch');
            console.log(joke);
            if (joke.result[jokeCounter].value.length > 220) {
                resultBox.style.overflowY = 'scroll';
            }
            else {
                resultBox.style.overflowY = 'hidden';
            }
            if (joke.result.length !== 0 && joke.result.length > jokeCounter) {
                result.innerHTML = '<h3>' + joke.result[jokeCounter].value + '</h3>';
            }
            else {
                if (jokeCounter === 0) {
                    result.innerHTML = '<h3>There is no joke with this word._.</h3>';
                }
                else {
                    result.innerHTML = '<h3>There are no more jokes with this word._.</h3>';
                }
            }
        }
    };
    xhttp.open('GET', 'https://api.chucknorris.io/jokes/search?query=' + searchQuery, true);
    xhttp.send();
}
