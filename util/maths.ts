import { PaceEditorState } from './../types/index';
import { MODE } from './constants';

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

export const metersToMilesToCalcMilePace = (meters: number) => {
	return meters * 0.621371;
};

export const milesToMetresToCalcKilometerPace = (miles: number) => {
	return miles / 0.621371;
};

export const metersToMiles = (meters: number, toFixed = false) => {
	return toFixed
		? ((meters / 1000) * 0.621371).toFixed()
		: (meters / 1000) * 0.621371;
};

export const milesToMeters = (miles: number, toFixed = false): number => {
	return toFixed
		? Number((miles / 0.621371).toFixed(0))
		: Number(miles / 0.621371);
};

export const paceInmilesFromStateData = (data: any) => {
	const secondsOfRacing = hoursMinutesAndSecondsToSeconds(
		data.hours,
		data.minutes,
		data.seconds,
	);
	const miles = metersToMilesToCalcMilePace(data.distance);

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

export const minutesAndHoursAndSecondsFromSeconds = (
	sec: number,
	meters: number,
) => {
	const totalRaceTime = (sec * meters) / 1000;
	const h = totalRaceTime / 3600;
	const m = (h % 1) * 60;
	const s = (m % 1) * 60;
	return {
		hours: Number(Math.floor(h).toFixed()),
		minutes: Number(Math.floor(m).toFixed()),
		seconds: Number(Math.abs(s).toFixed()),
	};
};

export const updateStateFromPace = (
	state: PaceEditorState,
	mode: string,
	distance: number,
) => {
	const meters =
		mode == MODE.METRIC ? distance : milesToMetresToCalcKilometerPace(distance);

	const data = mode == MODE.METRIC ? state.metricPace : state.imperialPace;

	const sec = hoursMinutesAndSecondsToSeconds(0, data.minutes, data.seconds);

	return minutesAndHoursAndSecondsFromSeconds(sec, meters);
};

// export const completeStateData = (state: any, mode: string) => {
// 	const secondsOfRacing = hoursMinutesAndSecondsToSeconds(
// 		state.hours,
// 		state.minutes,
// 		state.seconds,
// 	);

// 	const miles =
// 		mode == MODE.IMPERIAL
// 			? state.distance
// 			: metersToMilesToCalcMilePace(state.distance);
// 	const kilometres = MODE.METRIC
// 		? state.distance
// 		: milesToMetresToCalcKilometerPace(state.distance);

// 	const secondsPerKm = secondsPerUnitFromSecondsAndDistance(
// 		secondsOfRacing,
// 		kilometres,
// 	);
// 	const secondsPerMiles = secondsPerUnitFromSecondsAndDistance(
// 		secondsOfRacing,
// 		miles,
// 	);

// 	return {
// 		pacePerKilometer: minutesAndSecondsFromSeconds(secondsPerKm),
// 		pacePerMile: minutesAndSecondsFromSeconds(secondsPerMiles),
// 	};
// };
