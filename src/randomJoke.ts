'use strict';

let previous: string = 'null';

function loadChuckJoke(): void {
	let selectedType: string = (document.getElementById('selection') as HTMLInputElement).value;
	let result: HTMLElement = document.getElementById('result') as HTMLElement;
	let xhttp: XMLHttpRequest = new XMLHttpRequest();
	result.innerHTML = '';

	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {

			let joke: joke = JSON.parse(this.responseText) as HTMLInputElement;
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
	} else {
		xhttp.open('GET', 'https://api.chucknorris.io/jokes/random?category=' + selectedType, true);
	}

	xhttp.send();
}