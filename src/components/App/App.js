import logo from './logo.gif';
import Quote from '../Quote/Quote';
import Choices from '../Choices/Choices';

import './App.css';

function genRandIndex() {
	const randIndexArr = new Set();
	while (randIndexArr.size < 10) {
		const randomIndex = Math.floor(Math.random() * 101);
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
	async function getAPI() {
		const response = await fetch(
			'https://the-one-api.dev/v2/quote?limit=100',
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer W8wht_QYtxgN3GBC0RHg',
				},
			}
		);
		const data = await response.json();
		const randomIndexes = genRandIndex();
		const finalQuotes = filterQuotes(data.docs, randomIndexes);
	}

	getAPI();

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Lord of The Rings Quiz</h1>
				<img
					className='App-logo'
					alt='One Ring to Rule Them All'
					src={logo}
				/>
				<Quote />
				<Choices />
			</header>
		</div>
	);
}

export default App;
