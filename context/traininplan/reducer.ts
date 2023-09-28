import { defaultDay, defaultPeriod, defaultPlan, defaultSplit, defaultSession } from './defaults';

const reducer = (state: any, action: any) => {
	// console.log('[state]', state);
	// console.log('[PAYLOAD]', action.payload);

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
		newState.periods[periodIndex].plan[weekIndex].days[dayIndex].sessions.push(defaultSession());
		return { ...newState };
	}

	if (action.type === 'ADD_SPLIT') {
		const newState = { ...state };
		const { periodIndex, weekIndex, dayIndex, sessionIndex } = action.payload;
		newState.periods[periodIndex].plan[weekIndex].days[dayIndex].sessions[sessionIndex].splits.push(defaultSplit());
		return { ...newState };
	}

	if (action.type === 'EDIT_SPLIT_TYPE') {
		const newState = { ...state };
		const { value, periodIndex, weekIndex, dayIndex, sessionIndex, splitIndex } = action.payload;
		newState.periods[periodIndex].plan[weekIndex].days[dayIndex].sessions[sessionIndex].splits[splitIndex].intensity = value;
		return { ...newState };
	}

	if (action.type === 'EDIT_SPLIT_NAME') {
		const newState = { ...state };
		const { value, periodIndex, weekIndex, dayIndex, sessionIndex, splitIndex } = action.payload;
		newState.periods[periodIndex].plan[weekIndex].days[dayIndex].sessions[sessionIndex].splits[splitIndex].name = value;
		return { ...newState };
	}

	if (action.type === 'EDIT_SPLIT_UNIT') {
		const newState = { ...state };
		const { value, periodIndex, weekIndex, dayIndex, sessionIndex, splitIndex } = action.payload;
		newState.periods[periodIndex].plan[weekIndex].days[dayIndex].sessions[sessionIndex].splits[splitIndex].unit = value;
		return { ...newState };
	}

	if (action.type === 'EDIT_SPLIT_TIME') {
		const newState = { ...state };
		const { value, periodIndex, weekIndex, dayIndex, sessionIndex, splitIndex } = action.payload;
		newState.periods[periodIndex].plan[weekIndex].days[dayIndex].sessions[sessionIndex].splits[splitIndex].minutes = parseInt(value);
		return { ...newState };
	}

	if (action.type === 'EDIT_SPLIT_DISTANCE') {
		const newState = { ...state };
		const { value, periodIndex, weekIndex, dayIndex, sessionIndex, splitIndex } = action.payload;
		newState.periods[periodIndex].plan[weekIndex].days[dayIndex].sessions[sessionIndex].splits[splitIndex].distance = parseInt(value);
		return { ...newState };
	}

	if (action.type === 'SET_DRAGGED_TYPE') {
		const newState = { ...state };
		const { type } = action.payload;

		return { ...newState, draggedType: type };
	}

	if (action.type === 'SET_ACTIVE_ID') {
		const newState = { ...state };
		const { id } = action.payload;
		return { ...newState, activeId: id };
	}

	if (action.type === 'EDIT_PERIOD_NAME') {
		const newState = { ...state };
		const { value, periodIndex } = action.payload;
		newState.periods[periodIndex].name = value;
		return { ...newState };
	}

	if (action.type === 'EDIT_SESSION_NAME') {
		const newState = { ...state };
		const { value, periodIndex, weekIndex, dayIndex, sessionIndex } = action.payload;
		newState.periods[periodIndex].plan[weekIndex].days[dayIndex].sessions[sessionIndex].name = value;
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

	if (action.type === 'SET_SOMETHING_IS_DRAGGED') {
		const { isDragged } = action.payload;
		return { ...state, someThingIsDragged: isDragged };
	}

	if (action.type === 'DROP_SPLIT') {
		const newState = { ...state };

		const { dayIndex, periodIndex, sessionIndex, split, splitIndex, weekIndex } = action.payload.data;

		newState.periods[periodIndex].plan[weekIndex].days[dayIndex].sessions[sessionIndex].splits.splice(splitIndex, 1);

		newState.periods[periodIndex].plan[weekIndex].days[dayIndex].sessions[sessionIndex].splits.splice(action.payload.droppedAtIndex, 0, split);

		return { ...newState };
	}

	if (action.type === 'DROP_SESSION') {
		const newState = { ...state };

		const { dayIndex, periodIndex, sessionIndex, session, weekIndex } = action.payload.data;

		newState.periods[periodIndex].plan[weekIndex].days[dayIndex].sessions.splice(sessionIndex, 1);

		newState.periods[periodIndex].plan[weekIndex].days[dayIndex].sessions.splice(action.payload.droppedAtIndex, 0, session);

		return { ...newState };
	}

	if (action.type === 'DROP_DAY') {
		const newState = { ...state };

		const { dayIndex, periodIndex, day, weekIndex } = action.payload.data;

		newState.periods[periodIndex].plan[weekIndex].days.splice(dayIndex, 1);

		newState.periods[periodIndex].plan[weekIndex].days.splice(action.payload.droppedAtIndex, 0, day);

		return { ...newState };
	}

	if (action.type === 'DROP_WEEK') {
		const newState = { ...state };

		const { periodIndex, weekIndex, week } = action.payload.data;

		newState.periods[periodIndex].plan.splice(weekIndex, 1);

		newState.periods[periodIndex].plan.splice(action.payload.droppedAtIndex, 0, week);

		return { ...newState };
	}

	if (action.type === 'DROP_PERIOD') {
		const newState = { ...state };

		const { periodIndex, trainingPeriod } = action.payload.data;

		newState.periods.splice(periodIndex, 1);

		newState.periods.splice(action.payload.droppedAtIndex, 0, trainingPeriod);

		return { ...newState };
	}

	if (action.type === 'RESET_FROM_STORE') {
		const newState = { ...state };

		newState.periods = action.payload.store;
		return { ...newState };
	}

	if (action.type === 'SET_STORE') {
		const newState = { ...state };
		newState.store = action.payload.store;
		return { ...newState };
	}

	console.warn('Unknown action.');
};
export default reducer;
