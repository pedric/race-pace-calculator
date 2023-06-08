export default class Calculator {
	kmPaceToMilePace = (minutes: any, seconds: any, length: any) => {
		const secondsForTheWholeDistance =
			((minutes * 60 + seconds) / 1000) * length;
		const miles = this.metersToMiles(length);
		const secondsPerMiles = this.secondsPerUnitFromSecondsAndDistance(
			secondsForTheWholeDistance,
			miles,
		);
		let paceInMiles = this.minutesAndSecondsFromSeconds(secondsPerMiles);
		return paceInMiles;
	};

	milePaceToKmPace = (minutes: any, seconds: any, length: any) => {
		// one mile = 1.609344 km or 1 609.344 meters
		const secondsForTheWholeDistance =
			((minutes * 60 + seconds) / 1609) * length;
		const secondsPerKm = this.secondsPerUnitFromSecondsAndDistance(
			secondsForTheWholeDistance,
			length,
		);
		let paceInKm = this.minutesAndSecondsFromSeconds(secondsPerKm);
		return paceInKm;
	};

	secondsPerKm = (minutes: any, seconds: any) => {
		return minutes * 60 + seconds;
	};

	secondsPerKmFromMiles = (minutes: any, seconds: any, length: any) => {
		const totalOfSeconds = minutes * 60 + seconds;
		const distance = this.milesToMeters(length);
		return totalOfSeconds / distance;
	};

	secondsPerMeter = (secondsKm: any) => {
		return secondsKm / 1000;
	};

	totalTimeInSeconds = (seconds: any, length: any) => {
		return seconds * length;
	};

	totalTimeInSecondsFromPaceAndDistance = (
		minutes: any,
		seconds: any,
		length: any,
	) => {
		return (parseInt(minutes * 60 + seconds) / 1000) * length;
	};

	totalHoursFromTotalTimeInSeconds = (seconds: any) => {
		return Math.floor(seconds / 3600);
	};
	totalMinutesAfterHours = (seconds: any) => {
		return Math.trunc((seconds % 3600) / 60);
	};

	totalSecondsAfterMinutes = (seconds: any, minutes: any) => {
		return Math.trunc((seconds % 3600) - minutes * 60);
	};

	hoursMinutesAndSecondsFromSeconds = (sec: any) => {
		const h = this.totalHoursFromTotalTimeInSeconds(sec);
		const m = this.totalMinutesAfterHours(sec);
		const s = this.totalSecondsAfterMinutes(sec, m);
		return {
			hours: h,
			minutes: m,
			seconds: s,
		};
	};

	hoursMinutesAndSecondsToSeconds = (h: any, m: any, s: any) => {
		const hours = h * 3600;
		const minutes = m * 60;
		const seconds = s;
		return hours + minutes + seconds;
	};

	metersToMiles = (meters: any) => {
		return parseInt(meters) * 0.621371;
	};

	milesToMeters = (miles: any) => {
		return parseInt(miles) / 0.621371;
	};

	minutesAndSecondsFromSeconds = (sec: any) => {
		const minutes = Math.trunc(sec / 60);
		const seconds = Math.trunc(sec % 60);
		return { minutes: minutes, seconds: seconds };
	};

	secondsPerUnitFromSecondsAndDistance = (sec: any, length: any) => {
		return (parseInt(sec) / parseInt(length)) * 1000;
	};

	minutesPerUnitFromSeconds = (sec: any) => {
		return Math.trunc(sec / 60);
	};

	secondsPerUnitFromSeconds = (sec: any) => {
		return Math.trunc(sec % 60);
	};

	paceInmilesFromStateData(state: any) {
		const secondsOfRacing = this.hoursMinutesAndSecondsToSeconds(
			state.finisherTime.hours,
			state.finisherTime.minutes,
			state.finisherTime.seconds,
		);
		const miles = this.metersToMiles(state.raceLength.meters);
		const secondsPerMiles = this.secondsPerUnitFromSecondsAndDistance(
			secondsOfRacing,
			miles,
		);
		let paceInmiles = this.minutesAndSecondsFromSeconds(secondsPerMiles);
		return paceInmiles;
	}

	paceInKmFromStateData(state: any) {
		const secondsOfRacing = this.hoursMinutesAndSecondsToSeconds(
			state.hours,
			state.minutes,
			state.seconds,
		);
		const secondsPerKm = this.secondsPerUnitFromSecondsAndDistance(
			secondsOfRacing,
			state.distance,
		);
		let paceInKm = this.minutesAndSecondsFromSeconds(secondsPerKm);
		return paceInKm;
	}
}
