'use strict';

let previous = 'null';
let joke = 0;
let jokeCounter = 0;

function switchToDifferentJoke(direction) {
	if (direction === 'right') {
		++jokeCounter;
	} else {
		console.log(jokeCounter);
		if (jokeCounter > 0) {
			--jokeCounter;
		}
	}
	wordChecker();
}

function loadChuckJoke() {
	let selectedType = document.getElementById('selection').value;
	let result = document.getElementById('result');
	let xhttp = new XMLHttpRequest();
	result.innerHTML = '';

	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {

			joke = JSON.parse(this.responseText);
			if (joke.value === previous) {
				loadChuckJoke();
			}

			previous = joke.value;
			console.log('answer.categoryJoke');
			console.log(joke);

			result.innerHTML += '<h3>' + joke.value + '</h3>';
		}

	};

	if (selectedType === 'random') {
		xhttp.open('GET', 'https://api.chucknorris.io/jokes/random', true);
	} else {
		xhttp.open('GET', 'https://api.chucknorris.io/jokes/random?category=' + selectedType, true);
	}

	xhttp.send();
}

function loadSearchJoke() {
	let searchQuery = ' ' + document.getElementById('inputSearch').value;
	let result = document.getElementById('result');
	let xhttp = new XMLHttpRequest();
	result.innerHTML = '';
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {

			joke = JSON.parse(this.responseText);

			console.log('answer.loadSearch');
			console.log(joke);
			console.log(joke.value);


			if (joke.result.length !== 0 && joke.result.length > jokeCounter) {
				result.innerHTML = '<h3>' + joke.result[jokeCounter].value + '</h3>';
			} else {
				result.innerHTML = '<h3>There is no joke with this word._.</h3>';
			}

		}

	};
	xhttp.open('GET', 'https://api.chucknorris.io/jokes/search?query=' + searchQuery, true);
	xhttp.send();
}


function wordChecker() {
	let searchQuery = document.getElementById('inputSearch').value;
	let result = document.getElementById('result');
	let xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if ((this.readyState === 4 && this.status === 200) || (searchQuery === 'norris' || searchQuery === 'Norris')) {
			console.log('answer.wordChecker');
			console.log(joke);
			console.log(joke.value);
			loadSearchJoke();
		} else if (this.status === 404) {
			result.innerHTML = '<h3>Sorry, this word does not exist._.</h3>';
		}

	};
	xhttp.open('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/' + document.getElementById('inputSearch').value, true);
	xhttp.send();
}