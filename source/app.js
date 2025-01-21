import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import fetchWeather from '../utils/fetchWeather.js';

export default function App() {
	const [weatherData, setWeatherData] = useState(null);
	const [error, setError] = useState(null);

	// location hard coded for testing. 
	const location = '80487'

	useEffect(() => {
		(async () => {
			try {
				const data = await fetchWeather(location);
				setWeatherData(data);
			} catch (err) {
				setError(err.message);
			}
		})();
	}, []);

	if (error) {
		return <Text color="red">Error: {error}</Text>
	}

	if (!weatherData) {
    return <Text color="yellow">Fetching weather data...</Text>;
  }

  const { name: cityName, region, country } = weatherData.location;
  const { temp_f, condition } = weatherData.current;

	return (
		<Box flexDirection='column' borderTop='single'>
			<Text color="cyan">Current Weather in {cityName}, {region}, {country}:</Text>
			<Box marginTop={1} flexDirection='column' borderStyle='round' borderColor="green" width={50}>
				<Text>
					Temperature:<Text color='blue'>{temp_f}°F</Text>
				</Text>
				<Text>
					Condition: <Text color="magenta">{condition.text}</Text>
				</Text>
			</Box>
		</Box>
	);
}
