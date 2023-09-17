import {
	defaultDay,
	defaultPeriod,
	defaultPlan,
	defaultSplit,
	defaultSession,
} from './defaults';

const reducer = (state: any, action: any) => {
	console.log('[state]', state);
	console.log('[PAYLOAD]', action.payload);

	if (action.type === 'ADD_DAY') {
		const newState = { ...state };
		const { periodIndex, weekIndex, dayIndex } = action.payload;
		newState.periods[periodIndex].plan[weekIndex].days.push(defaultDay());
		return { ...newState };
	}

	if (action.type === 'ADD_PERIOD') {
		const newState = { ...state };
		newState.periods.push(defaultPeriod());
		return { ...newState };
	}

	if (action.type === 'ADD_WEEK') {
		const newState = { ...state };
		const { periodIndex, weekIndex } = action.payload;
		newState.periods[periodIndex].plan.push(defaultPlan());
		return { ...newState };
	}

	if (action.type === 'ADD_SESSION') {
		const newState = { ...state };
		const { periodIndex, weekIndex, dayIndex } = action.payload;
		newState.periods[periodIndex].plan[weekIndex].days[dayIndex].sessions.push(
			defaultSession(),
		);
		return { ...newState };
	}

	if (action.type === 'ADD_SPLIT') {
		const newState = { ...state };
		const { periodIndex, weekIndex, dayIndex, sessionIndex, splitIndex } =
			action.payload;
		newState.periods[periodIndex].plan[weekIndex].days[dayIndex].sessions[
			sessionIndex
		].splits.push(defaultSplit());
		return { ...newState };
	}

	if (action.type === 'EDIT_SPLIT_TYPE') {
		const newState = { ...state };
		const {
			value,
			periodIndex,
			weekIndex,
			dayIndex,
			sessionIndex,
			splitIndex,
		} = action.payload;
		newState.periods[periodIndex].plan[weekIndex].days[dayIndex].sessions[
			sessionIndex
		].splits[splitIndex].intensity = value;
		return { ...newState };
	}

	if (action.type === 'EDIT_SPLIT_NAME') {
		const newState = { ...state };
		const {
			value,
			periodIndex,
			weekIndex,
			dayIndex,
			sessionIndex,
			splitIndex,
		} = action.payload;
		newState.periods[periodIndex].plan[weekIndex].days[dayIndex].sessions[
			sessionIndex
		].splits[splitIndex].name = value;
		return { ...newState };
	}

	if (action.type === 'EDIT_SPLIT_UNIT') {
		const newState = { ...state };
		const {
			value,
			periodIndex,
			weekIndex,
			dayIndex,
			sessionIndex,
			splitIndex,
		} = action.payload;
		newState.periods[periodIndex].plan[weekIndex].days[dayIndex].sessions[
			sessionIndex
		].splits[splitIndex].unit = value;
		return { ...newState };
	}

	if (action.type === 'EDIT_SPLIT_TIME') {
		const newState = { ...state };
		const {
			value,
			periodIndex,
			weekIndex,
			dayIndex,
			sessionIndex,
			splitIndex,
		} = action.payload;
		newState.periods[periodIndex].plan[weekIndex].days[dayIndex].sessions[
			sessionIndex
		].splits[splitIndex].minutes = parseInt(value);
		return { ...newState };
	}

	if (action.type === 'EDIT_SPLIT_DISTANCE') {
		const newState = { ...state };
		const {
			value,
			periodIndex,
			weekIndex,
			dayIndex,
			sessionIndex,
			splitIndex,
		} = action.payload;
		newState.periods[periodIndex].plan[weekIndex].days[dayIndex].sessions[
			sessionIndex
		].splits[splitIndex].distance = parseInt(value);
		return { ...newState };
	}

	if (action.type === 'EDIT_SESSION_NAME') {
		const newState = { ...state };
		const { value, periodIndex, weekIndex, dayIndex, sessionIndex } =
			action.payload;
		newState.periods[periodIndex].plan[weekIndex].days[dayIndex].sessions[
			sessionIndex
		].name = value;
		return { ...newState };
	}

	if (action.type === 'EDIT_DAY_NAME') {
		const newState = { ...state };
		const { value, periodIndex, weekIndex, dayIndex } = action.payload;
		newState.periods[periodIndex].plan[weekIndex].days[dayIndex].name = value;
		return { ...newState };
	}

	if (action.type === 'EDIT_WEEK_NAME') {
		const newState = { ...state };
		const { value, periodIndex, weekIndex } = action.payload;
		newState.periods[periodIndex].plan[weekIndex].name = value;
		return { ...newState };
	}

	if (action.type === 'CHANGE_WEEK_START') {
		const { startsMonday } = action.payload;
		return { ...state, weekStartMonday: startsMonday };
	}

	console.log('Unknown action.');
};
export default reducer;
