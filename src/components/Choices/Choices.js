import React, { useEffect } from 'react';
import './Choices.css';

export default function Choices({ quotes, genRandIndex, filterCharacters }) {
	console.log('char ID', quotes[0].character);
	const choices = [];

	// make another api call to the specific character ID.
	// use the text to set text on the button.
	// save the text in a variable.

	// creat two more variables with random names in, selected from an array of names. e.g

	useEffect(
		() => {
			async function getCharacter() {
				let response = await fetch(`https://the-one-api.dev/v2/character/${quotes[0].character}`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer W8wht_QYtxgN3GBC0RHg'
					}
				});
				let data = await response.json();
				console.log('data', data.docs[0].name);
				choices.push({ character: data.docs[0].name, value: true });

				response = await fetch(`https://the-one-api.dev/v2/character`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer W8wht_QYtxgN3GBC0RHg'
					}
				});
				data = await response.json();

				const incorrectChoiceIndex = genRandIndex(2, 51);
				console.log('incorrectChoice', incorrectChoiceIndex);
				const incorrectCharacters = filterCharacters(data.docs, incorrectChoiceIndex);
				console.log('incorrect Characters', incorrectCharacters);
			}
			getCharacter();
		},
		[ quotes ]
	);

	// const names = [
	// 	{character: 'Frodo', value: false},
	// 	{character: 'Gandalf', value: false},
	// 	{character: 'Legolas', value: false},
	// 	{character: 'Samwise Gamgee', value: false},
	// 	{character: 'Gollum', value: false}
	// ]

	// const correctAns = [
	// 	{character: 'api.text', value: true}

	// ]

	// const buttonOptions = [{value:false >> goes to value 3, for example},]

	return (
		<div className="choices">
			<button>Value 1</button>
			<button>Value 2</button>
			<button>Value 3</button>
		</div>
	);
}
