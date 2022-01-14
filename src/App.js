import logo from './logo.svg';
import './App.css';

function App() {
	async function getAPI() {
		const response = await fetch('https://the-one-api.dev/v2/character?limit=10', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer W8wht_QYtxgN3GBC0RHg'
			}
		});
		const data = await response.json();
		console.log(data);
	}

	getAPI();

	return <div className="App" />;
}

export default App;
