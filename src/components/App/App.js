import logo from './logo.gif';
import Quote from '../Quote/Quote';
import Choices from '../Choices/Choices';

import './App.css';
import { useState, useEffect } from 'react';

function genRandIndex(size, num) {
	const randIndexArr = new Set();
	while (randIndexArr.size < size) {
		const randomIndex = Math.floor(Math.random() * num);
		randIndexArr.add(randomIndex);
	}
	return randIndexArr;
}

function filterQuotes(apiData, randIndexes) {
	const newQuotes = [];
	for (let index of randIndexes) {
		newQuotes.push(apiData[index]);
	}
	return newQuotes;
}

function App() {
	// Generate 10 random indexes
	//Ensure that the 10 random indexes are unique
	// If random index exists in arr, generate another one.
	// select from data the 10 random indexes

	const [ quotes, setQuotes ] = useState([]);
	const [ characters, setCharacters ] = useState([]);

	useEffect(() => {
		async function getAPI() {
			const response = await fetch('https://the-one-api.dev/v2/quote?limit=100', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer W8wht_QYtxgN3GBC0RHg'
				}
			});
			const data = await response.json();
			console.log('data', data);
			const randomIndexes = genRandIndex(10, 101);
			console.log(randomIndexes);
			const newQuote = filterQuotes(data.docs, randomIndexes);
			setQuotes(newQuote);
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
					<Choices quotes={quotes} genRandIndex={genRandIndex} filterCharacters={filterQuotes} />
				</div>
			);
		}
	}

	return (
		<div className="App">
			<header className="App-header">
				<h1>Lord of The Rings Quiz</h1>
				<img className="App-logo" alt="One Ring to Rule Them All" src={logo} />
				{/* <Quote quotes={quotes}/> */}
				{renderQuote()}
			</header>
		</div>
	);
}

export default App;
