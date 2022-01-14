import React from 'react';
import './Choices.css';

export default function Choices({
	quotes,
	setQuotes,
	characters,
	score,
	setScore,
}) {
	const choices = [];
	function getRandomChoices() {
		const indexArr = [
			Math.floor(Math.random() * characters.length),
			Math.floor(Math.random() * characters.length),
		];
		indexArr.forEach((el) => choices.push(characters[el]));
	}
	function getCorrectChoice() {
		const correctChoice = characters.find(
			(el) => el.id === quotes[0].character
		);
		choices.push(correctChoice);
	}
	if (characters.length > 0) {
		getRandomChoices();
		getCorrectChoice();
	}

	function checkAnswer(e) {
		if (e.target.id === quotes[0].character) {
			setScore(score++);
		} else {
			if (score < 1) {
				return;
			}
			setScore(score--);
		}
		const newQuotes = [...quotes];
		newQuotes.shift();
		setQuotes(newQuotes);
	}

	// make another api call to the specific character ID.
	// use the text to set text on the button.
	// save the text in a variable.

	// creat two more variables with random names in, selected from an array of names. e.g

	// const buttonOptions = [{value:false >> goes to value 3, for example},]
	function renderChoices() {
		if (choices.length === 0) {
			return;
		} else {
			return choices.map((choice) => (
				<button onClick={checkAnswer} id={choice.id} key={choice.id}>
					{choice.name}
				</button>
			));
		}
	}
	return <div className='choices'>{renderChoices()}</div>;
}
