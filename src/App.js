import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import logo from './mlh-prep.png';
import Results from './components/results-components';

function App() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [city, setCity] = useState('New York City');
	const [results, setResults] = useState(null);

	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=' +
				city +
				'&units=metric' +
				'&appid=' +
				process.env.REACT_APP_APIKEY
		)
			.then((res) => res.json())
			.then(
				(result) => {
					if (result['cod'] !== 200) {
						setIsLoaded(false);
					} else {
						setIsLoaded(true);
						setResults(result);
					}
				},
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			);
	}, [city]);

	if (error) {
		return <div>Error: {error.message}</div>;
	} else {
		return (
			<>
				<img className='logo' src={logo} alt='MLH Prep Logo'></img>
				<div>
					<h2>Enter a city below 👇</h2>
					<input
						type='text'
						value={city}
						onChange={(event) => setCity(event.target.value)}
					/>
          <Results 
            isLoaded={isLoaded}
            results={results}
          />
				</div>
			</>
		);
	}
}

export default App;
