import {
	SESSION_TYPES,
	MEASUREMENT_TYPES,
	TRAINING_PLAN_MEASUREMENT_UNITS,
} from '../../util/constants';
import {
	TypeTrainingPlanState,
	TypeSessionSplit,
	TypeSession,
	TypePeriod,
	TypeDay,
	TypeWeek,
} from '../../types';

export const defaultSplit = (
	units = TRAINING_PLAN_MEASUREMENT_UNITS.KM,
): TypeSessionSplit => {
	return {
		name: '',
		distance: 0,
		minutes: 0,
		unit: units,
		intensity: SESSION_TYPES.EASY,
	};
};

export const defaultSession = (
	units = TRAINING_PLAN_MEASUREMENT_UNITS.KM,
): TypeSession => {
	return {
		name: '',
		splits: [defaultSplit(units)],
	};
};

export const defaultDay = (
	units = TRAINING_PLAN_MEASUREMENT_UNITS.KM,
): TypeDay => {
	return { name: '', sessions: [defaultSession(units)], done: false };
};

export const defaultPlan = (
	units = TRAINING_PLAN_MEASUREMENT_UNITS.KM,
): TypeWeek => {
	return {
		name: '',
		days: [
			{
				name: '',
				sessions: [defaultSession(units)],
				done: false,
			},
		],
	};
};

export const defaultPeriod = (
	units = TRAINING_PLAN_MEASUREMENT_UNITS.KM,
): TypePeriod => {
	return {
		length: 0,
		name: '',
		plan: [
			{
				name: '',
				days: [
					{
						name: '',
						sessions: [defaultSession(units)],
						done: false,
					},
				],
			},
		],
	};
};
