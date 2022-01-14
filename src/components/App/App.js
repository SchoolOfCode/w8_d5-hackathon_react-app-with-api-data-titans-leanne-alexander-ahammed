import logo from './logo.gif';
import Quote from '../Quote/Quote';
import Choices from '../Choices/Choices';

import './App.css';
import { useState, useEffect } from 'react';

function genRandomData(size, num, apiData) {
	const randIndexArr = new Set();
	while (randIndexArr.size < size) {
		const randomIndex = Math.floor(Math.random() * num);
		randIndexArr.add(randomIndex);
	}
	const randomData = [];
	for (let index of randIndexArr) {
		randomData.push(apiData[index]);
	}
	return randomData;
}

const fetchHeaders = {
	'Content-Type': 'application/json',
	'Authorization': 'Bearer W8wht_QYtxgN3GBC0RHg',
};

// function filterQuotes(apiData, randIndexes) {

// }

function App() {
	// Generate 10 random indexes
	//Ensure that the 10 random indexes are unique
	// If random index exists in arr, generate another one.
	// select from data the 10 random indexes

	const [quotes, setQuotes] = useState([]);
	const [characters, setCharacters] = useState([]);
	const [score, setScore] = useState(0);

	useEffect(() => {
		async function getAPI() {
			// Fetch Quotes from API
			let response = await fetch(
				'https://the-one-api.dev/v2/quote?limit=100',
				{
					headers: fetchHeaders,
				}
			);
			let data = await response.json();
			const gameQuotes = genRandomData(10, 101, data.docs);
			setQuotes(gameQuotes);

			// Fetch Characters from API
			response = await fetch(`https://the-one-api.dev/v2/character`, {
				headers: fetchHeaders,
			});
			data = await response.json();
			const chars = [];
			data.docs.forEach((el) =>
				chars.push({ name: el.name, id: el._id })
			);
			setCharacters(chars);
		}

		getAPI();
	}, []);

	function renderQuote() {
		if (quotes.length === 0) {
			return;
		} else {
			return (
				<div>
					<Quote quotes={quotes} />
					<Choices
						quotes={quotes}
						characters={characters}
						score={score}
						setScore={setScore}
						setQuotes={setQuotes}
					/>
				</div>
			);
		}
	}

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Lord of The Rings Quiz</h1>
				<img
					className='App-logo'
					alt='One Ring to Rule Them All'
					src={logo}
				/>
				{/* <Quote quotes={quotes}/> */}
				{renderQuote()}
			</header>
		</div>
	);
}

export default App;
