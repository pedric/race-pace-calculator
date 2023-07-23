import { Distance } from './distances';
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
	const minutes = Number(Math.floor(sec / 60));
	const seconds = Number(Math.floor(sec % 60));
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
	floor = false,
) => {
	const validData = isNaN(sec) || isNaN(meters) ? false : true;

	const totalRaceTime = (sec * meters) / 1000;
	const h = isNaN(totalRaceTime) ? 0 : totalRaceTime / 3600;
	const m = isNaN(totalRaceTime) ? 0 : (h % 1) * 60;
	const s = isNaN(totalRaceTime) ? 0 : (m % 1) * 60;
	return {
		hours: Number(Math.floor(h).toFixed()),
		minutes: Number(Math.floor(m).toFixed()),
		seconds: floor
			? Number(Math.floor(s).toFixed())
			: Number(Math.abs(s).toFixed()),
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

export const metersToKilometers = (val: number) => {
	return Number(val * 1000);
};

export const kilometresTometers = (val: number) => {
	return val / 1000;
};

export const distanceToKilometres = (val: number) => {
	const value = val / 1000;
	return twoDecimalNumber(value);
};

export const twoDecimalNumber = (val: number) => {
	return typeof val == 'number' ? val.toFixed(2) : null;
};

export const getComparisonPaceFromStateData = (
	data: any,
	distance: number,
	mode: string,
	units: number,
) => {
	// for total distance
	let secondsOfRacing = hoursMinutesAndSecondsToSeconds(
		data.hours,
		data.minutes,
		data.seconds,
	);

	const adjustedDistance =
		mode == MODE.METRIC ? distance : metersToMilesToCalcMilePace(distance);
	const secondsPerUnit =
		mode == MODE.METRIC
			? secondsOfRacing / data.distance
			: secondsOfRacing / metersToMilesToCalcMilePace(data.distance);
	const totalSeconds = secondsPerUnit * adjustedDistance;

	// const miles = metersToMilesToCalcMilePace(distance);

	const secondsPerMile = secondsPerUnitFromSecondsAndDistance(
		totalSeconds,
		adjustedDistance,
	);

	const secondsPerKm = secondsPerUnitFromSecondsAndDistance(
		totalSeconds,
		distance,
	);

	return {
		total:
			mode == MODE.METRIC
				? minutesAndHoursAndSecondsFromSeconds(secondsPerKm, distance, true)
				: minutesAndHoursAndSecondsFromSeconds(secondsPerMile, distance, true),
	};
};

export const leadingZero = (val: number) => {
	let value = Number(val) < 10 ? `0${val}` : val;
	return value;
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
