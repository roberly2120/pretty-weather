import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import fetchWeather from '../utils/fetchWeather.js';
import parseArgs from '../utils/parseArgs.js';
import { getDateAndTime, tempColor } from '../utils/functions.js';


export default function App() {
	const [weatherData, setWeatherData] = useState(null);
	const [error, setError] = useState(null);
	const [dateTime, setDateTime] = useState({});
	const [temperatureColor, setTemperatureColor] = useState("");

	const { location, units, command } = parseArgs();

	useEffect(() => {
		(async () => {
			try {
				const data = await fetchWeather(location);
				setTemperatureColor(tempColor(data))
				const { time, year, month, day } = getDateAndTime(data)
				setDateTime({...dateTime, time, year, month, day})
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
		<Box flexDirection='column' borderStyle='round' borderColor='green'>
			<Text color="yellowBright">{cityName}, {region}, {country}</Text>
			<Text color="whiteBright">{dateTime.month} {dateTime.day} - {dateTime.time}</Text>
			<Box marginTop={1} flexDirection='column'>
				<Box flexDirection="column" marginLeft={1}>
					<Text>
						Temperature:<Text color={temperatureColor}>{temp_f}°F</Text>
					</Text>
					<Text>
						Condition: <Text color="magenta">{condition.text}</Text>
					</Text>
				</Box>
			</Box>
		</Box>
	);
}
