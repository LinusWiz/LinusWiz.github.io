'use strict';

let jokeCounter: number = 0;

function switchToDifferentJoke(direction: string): void {
    if (direction === 'right') {
        ++jokeCounter;
    } else {
        console.log(jokeCounter);
        if (jokeCounter > 0) {
            --jokeCounter;
        }
    }
    loadSearchJoke();
}

class joke {
    'value': string;
}

class jokeList {
    'result': joke[];
}

function loadSearchJoke(isNewQuery: boolean = false) {
    if (isNewQuery) {
        jokeCounter = 0;
    }

    let searchQuery: string = ' ' + (document.getElementById('inputSearch') as HTMLInputElement).value;
    let result: HTMLElement = document.getElementById('result') as HTMLElement;
    let resultBox: HTMLElement = document.getElementById('resultBox') as HTMLElement;
    let xhttp: XMLHttpRequest = new XMLHttpRequest();
    result.innerHTML = '';
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            let joke: jokeList = JSON.parse(this.responseText);
            console.log('answer.loadSearch');
            console.log(joke);

            if (joke.result[jokeCounter].value.length > 220) {
                resultBox.style.overflowY = 'scroll';
            } else {
                resultBox.style.overflowY = 'hidden';
            }

            if (joke.result.length !== 0 && joke.result.length > jokeCounter) {
                result.innerHTML = '<h3>' + joke.result[jokeCounter].value + '</h3>';
            } else {
                if (jokeCounter === 0) {
                    result.innerHTML = '<h3>There is no joke with this word._.</h3>';
                } else {
                    result.innerHTML = '<h3>There are no more jokes with this word._.</h3>';
                }
            }

        }

    };
    xhttp.open('GET', 'https://api.chucknorris.io/jokes/search?query=' + searchQuery, true);
    xhttp.send();
}