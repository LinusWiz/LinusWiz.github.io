'use strict';

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
	loadSearchJoke();
}

function loadSearchJoke(isNewQuery) {
	if (isNewQuery) {
		jokeCounter = 0;
	}

	let searchQuery = ' ' + document.getElementById('inputSearch').value;
	let result = document.getElementById('result');
	let xhttp = new XMLHttpRequest();
	result.innerHTML = '';
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {

			let joke = JSON.parse(this.responseText);

			console.log('answer.loadSearch');
			console.log(joke);
			console.log(joke.value);


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