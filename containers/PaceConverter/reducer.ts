import { CONVERTION, CHANGE_TYPE, TIME_UNIT } from '../../util/constants';
import { kilometerPerHourPaceBasedOnSecondsOnly, minutesToSeconds, paceFromKmh, paceFromMph, paceInmilesFromStateData, milesPerHourPaceBasedOnSecondsOnly } from '../../util/maths';

const reducer = (state: any, action: any) => {
	if (action.type === 'incremented_age') {
		return {
			...state,
			age: action.payload,
		};
	}

	if (action.type === CHANGE_TYPE.MINUTE_PER_KM) {
		return {
			...state,
			minPerKm: action.payload,
		};
	}

	if (action.type === CHANGE_TYPE.SECOND_PER_KM) {
		return {
			...state,
			secPerKm: action.payload,
		};
	}

	if (action.type === CHANGE_TYPE.KMH_TO_PACE) {
		return {
			...state,
			kmh: action.payload,
		};
	}

	if (action.type === CONVERTION.SPEED_TO_PACE_METRIC) {
		const { minutes, seconds } = paceFromKmh(action.payload.kmh);

		// mockup data to make miles convertion
		const data = {
			hours: 0,
			distance: 1000,
			minutes: Number(minutes),
			seconds: Number(seconds),
		};
		const imperialPace = paceInmilesFromStateData(data);
		const milesPerHour = Number(action.payload.kmh) / 1.609344;

		const sec = minutesToSeconds(action.payload.minPerKm) + action.payload.secPerKm;
		// const num = Number(
		// 	kilometerPerHourPaceBasedOnSecondsOnly(action.payload.distance, sec),
		// );

		return {
			...state,
			minPerKm: minutes,
			secPerKm: seconds,
			minPerMile: imperialPace.minutes,
			secPerMile: imperialPace.seconds,
			mph: milesPerHour,
			kmh: action.payload.kmh,
		};
	}

	if (action.type === CONVERTION.PACE_TO_SPEED_METRIC) {
		const { minPerKm, secPerKm } = action.payload;

		const sec = minutesToSeconds(action.payload.minPerKm) + action.payload.secPerKm;
		const num = Number(kilometerPerHourPaceBasedOnSecondsOnly(action.payload.distance, sec));

		const newKmhPace = Math.round(num).toFixed(2);

		// mockup data to make miles convertion
		const data = {
			hours: 0,
			distance: 1000,
			minutes: Number(minPerKm),
			seconds: Number(secPerKm),
		};
		const imperialPace = paceInmilesFromStateData(data);
		const milesPerHour = Number(newKmhPace) / 1.609344;

		return {
			...state,
			minPerKm: minPerKm,
			secPerKm: secPerKm,
			minPerMile: imperialPace.minutes,
			secPerMile: imperialPace.seconds,
			mph: milesPerHour,
			kmh: num,
		};
	}

	if (action.type === CONVERTION.PACE_TO_SPEED_IMPERIAL) {
		const { minPerMile, secPerMile, distance } = action.payload;

		const sec = minutesToSeconds(minPerMile) + secPerMile;
		const milesPerHour = Number(milesPerHourPaceBasedOnSecondsOnly(distance, sec));
		const newKmhPace = Number(milesPerHour) * 1.609344;

		return {
			...state,
			minPerMile: minPerMile,
			secPerMile: secPerMile,
			mph: milesPerHour,
			kmh: newKmhPace,
		};
	}

	if (action.type === CONVERTION.SPEED_TO_PACE_IMPERIAL) {
		const { minutes, seconds } = paceFromMph(action.payload.mph);

		// mockup data to make miles convertion
		const data = {
			hours: 0,
			distance: 1000,
			minutes: Number(minutes),
			seconds: Number(seconds),
		};
		const imperialPace = paceInmilesFromStateData(data);
		// const milesPerHour = Number(action.payload.kmh) / 1.609344;

		const sec = minutesToSeconds(action.payload.minPerKm) + action.payload.secPerKm;
		// const num = Number(
		// 	kilometerPerHourPaceBasedOnSecondsOnly(action.payload.distance, sec),
		// );

		return {
			...state,
			minPerMile: minutes,
			secPerMile: seconds,
			// mph: milesPerHour,
		};
	}

	if (action.type === CHANGE_TYPE.ALL) {
		const initialState = {
			kmh: 0,
			mph: 0,
			minPerKm: 0,
			secPerKm: 0,
			minPerMile: 0,
			secPerMile: 0,
			distance: 1, // km
		};

		return initialState;
		// return state;
	}

	throw Error('Unknown action.');
};

export default reducer;
