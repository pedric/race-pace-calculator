export const hoursMinutesAndSecondsToSeconds = (h: any, m: any, s: any) => {
	const hours = h * 3600;
	const minutes = m * 60;
	const seconds = s;
	return hours + minutes + seconds;
};

export const secondsPerUnitFromSecondsAndDistance = (sec: any, length: any) => {
	return (parseInt(sec) / parseInt(length)) * 1000;
};

export const minutesAndSecondsFromSeconds = (sec: any) => {
	const minutes = Math.trunc(sec / 60);
	const seconds = Math.trunc(sec % 60);
	return { minutes, seconds };
};

export const paceInKmFromStateData = (data: any) => {
	const secondsOfRacing = hoursMinutesAndSecondsToSeconds(
		data.hours,
		data.minutes,
		data.seconds,
	);

	const secondsPerKm = secondsPerUnitFromSecondsAndDistance(
		secondsOfRacing,
		data.distance,
	);

	return minutesAndSecondsFromSeconds(secondsPerKm);
};

export const metersToMilesToCalcMilePce = (meters: number) => {
	return meters * 0.621371;
};

export const metersToMiles = (meters: number) => {
	return (meters / 1000) * 0.621371;
};

export const paceInmilesFromStateData = (data: any) => {
	const secondsOfRacing = hoursMinutesAndSecondsToSeconds(
		data.hours,
		data.minutes,
		data.seconds,
	);
	const miles = metersToMilesToCalcMilePce(data.distance);

	const secondsPerMiles = secondsPerUnitFromSecondsAndDistance(
		secondsOfRacing,
		miles,
	);

	return minutesAndSecondsFromSeconds(secondsPerMiles);
};

export const kilometerPerHourPace = (data: any) => {
	const totalSeconds = hoursMinutesAndSecondsToSeconds(
		data.hours,
		data.minutes,
		data.seconds,
	);
	return data.distance / 1000 / (totalSeconds / 3600);
};

export const milesPerHourPace = (data: any) => {
	const kmh = kilometerPerHourPace(data);
	return kmh / 1.609344;
};
