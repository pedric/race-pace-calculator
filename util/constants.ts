import { Breakpoints } from '../types';
import { DISTANCE } from './distances';

export enum UNIT {
	H = 'H',
	M = 'M',
	S = 'S',
}

export enum MODE {
	METRIC = 'METRIC',
	IMPERIAL = 'IMPERIAL',
}

export enum INPUT {
	SELECT = 'SELECT',
	FREE = 'FREE',
}

export const breakpoints: Breakpoints = {
	s: 500,
	m: 760,
	l: 1024,
};

export enum MONITOR {
	BUBBLE = 1,
	BOX = 2,
}

export enum SESSION_TYPES {
	TYPE = 'Session type',
	EASY = 'Easy',
	MARATHON_PACE = 'Marathon pace',
	THRESHOLD = 'Threshold',
	INTERVAL = 'Interval',
	REPETITIONS = 'Repetitions',
}

export enum MEASUREMENT_TYPES {
	TIME = 'Time',
	DISTANCE = 'Distance',
}

export enum CONVERTION {
	SPEED_TO_PACE_METRIC = 'SPEED_TO_PACE_METRIC',
	SPEED_TO_PACE_IMPERIAL = 'SPEED_TO_PACE_IMPERIAL',
	PACE_TO_SPEED_METRIC = 'PACE_TO_SPEED_METRIC',
	PACE_TO_SPEED_IMPERIAL = 'PACE_TO_SPEED_IMPERIAL',
}

export enum CHANGE_TYPE {
	KMH = 1,
	MPH = 2,
	KMH_TO_PACE = 3,
	MPH_TO_PACE = 4,
	MINUTE_PER_KM = 5,
	SECOND_PER_KM = 6,
	MPM = 7,
	ALL = 8,
	MINUTE_PER_MILE = 9,
	SECOND_PER_MILE = 10,
}

export enum TIME_UNIT {
	H = 'HOURS',
	S = 'SEC',
	M = 'MIN',
	SPEED = 'SPEED',
}

export enum UNITS {
	METRIC = 'METRIC',
	IMPERIAL = 'IMPERIAL',
}

export enum TRAINING_PLAN_MEASUREMENT_UNITS {
	KM = 'Km',
	MILES = 'Miles',
	MINUTES = 'Minutes',
}

export const weekDays: string[] = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
];

export const weekDaysStartOnsunday: string[] = [
	'Sunday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Monday',
];
