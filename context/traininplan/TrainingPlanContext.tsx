import React, { createContext, useReducer } from 'react';
import reducer from './reducer';
import {
	TypeTrainingPlanState,
	TypePeriod,
	TypeWeek,
	TypeDay,
	TypeSession,
	TypeSessionSplit,
} from '../../types';
import { defaultSplit, defaultSession, defaultPeriod } from './defaults';

export type TypeTrainingPlanContext = {
	name: string;
	periods: TypePeriod[];
	weekStartMonday: boolean;
	addDay: (periodIndex: number, weekIndex: number) => void;
	addWeek: (periodIndex: number, weekIndex: number) => void;
	addSession: (
		periodIndex: number,
		weekIndex: number,
		dayIndex: number,
		sessionIndex: number,
	) => void;
	addSplit: (
		periodIndex: number,
		weekIndex: number,
		dayIndex: number,
		sessionIndex: number,
		splitIndex: number,
	) => void;
	addPeriod: () => void;
	handleSplitName: (
		value: string,
		periodIndex: number,
		weekIndex: number,
		dayIndex: number,
		sessionIndex: number,
		splitIndex: number,
	) => void;
	handleSplitType: (
		value: string,
		periodIndex: number,
		weekIndex: number,
		dayIndex: number,
		sessionIndex: number,
		splitIndex: number,
	) => void;
	handleSplitUnit: (
		value: string,
		periodIndex: number,
		weekIndex: number,
		dayIndex: number,
		sessionIndex: number,
		splitIndex: number,
	) => void;
	handleSplitTime: (
		value: string,
		periodIndex: number,
		weekIndex: number,
		dayIndex: number,
		sessionIndex: number,
		splitIndex: number,
	) => void;
	handleSplitDistance: (
		value: string,
		periodIndex: number,
		weekIndex: number,
		dayIndex: number,
		sessionIndex: number,
		splitIndex: number,
	) => void;
	handleSessionName: (
		value: string,
		periodIndex: number,
		weekIndex: number,
		dayIndex: number,
		sessionIndex: number,
	) => void;
	handleDayName: (
		value: string,
		periodIndex: number,
		weekIndex: number,
		dayIndex: number,
	) => void;
	handleWeekName: (
		value: string,
		periodIndex: number,
		weekIndex: number,
	) => void;
	handleWeekStart: (startsMonday: boolean) => void;
};

const initialState: TypeTrainingPlanContext = {
	name: '',
	periods: [defaultPeriod()],
	weekStartMonday: true,
	addDay: () => {},
	addWeek: () => {},
	addSession: () => {},
	addSplit: () => {},
	addPeriod: () => {},
	handleSplitName: () => {},
	handleSessionName: () => {},
	handleDayName: () => {},
	handleWeekName: () => {},
	handleWeekStart: () => {},
	handleSplitType: () => {},
	handleSplitUnit: () => {},
	handleSplitTime: () => {},
	handleSplitDistance: () => {},
};

export const TrainingplanContext =
	createContext<TypeTrainingPlanContext>(initialState);

interface Props {
	children: React.ReactNode;
}

export const TrainingPlanProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const addDay = (periodIndex: number, weekIndex: number) => {
		console.log('add day');
		dispatch({
			type: 'ADD_DAY',
			payload: { periodIndex, weekIndex },
		});
	};

	const addWeek = (periodIndex: number, weekIndex: number) => {
		console.log('add day');
		dispatch({
			type: 'ADD_WEEK',
			payload: { periodIndex, weekIndex },
		});
	};

	const addSession = (
		periodIndex: number,
		weekIndex: number,
		dayIndex: number,
		sessionIndex: number,
	) => {
		dispatch({
			type: 'ADD_SESSION',
			payload: { periodIndex, weekIndex, dayIndex, sessionIndex },
		});
	};

	const addSplit = (
		periodIndex: number,
		weekIndex: number,
		dayIndex: number,
		sessionIndex: number,
		splitIndex: number,
	) => {
		dispatch({
			type: 'ADD_SPLIT',
			payload: { periodIndex, weekIndex, dayIndex, sessionIndex, splitIndex },
		});
	};

	const addPeriod = () => {
		dispatch({
			type: 'ADD_PERIOD',
			payload: null,
		});
	};

	const handleSplitName = (
		value: string,
		periodIndex: number,
		weekIndex: number,
		dayIndex: number,
		sessionIndex: number,
		splitIndex: number,
	) => {
		dispatch({
			type: 'EDIT_SPLIT_NAME',
			payload: {
				value,
				periodIndex,
				weekIndex,
				dayIndex,
				sessionIndex,
				splitIndex,
			},
		});
	};

	const handleSplitType = (
		value: string,
		periodIndex: number,
		weekIndex: number,
		dayIndex: number,
		sessionIndex: number,
		splitIndex: number,
	) => {
		dispatch({
			type: 'EDIT_SPLIT_TYPE',
			payload: {
				value,
				periodIndex,
				weekIndex,
				dayIndex,
				sessionIndex,
				splitIndex,
			},
		});
	};

	const handleSplitUnit = (
		value: string,
		periodIndex: number,
		weekIndex: number,
		dayIndex: number,
		sessionIndex: number,
		splitIndex: number,
	) => {
		dispatch({
			type: 'EDIT_SPLIT_UNIT',
			payload: {
				value,
				periodIndex,
				weekIndex,
				dayIndex,
				sessionIndex,
				splitIndex,
			},
		});
	};

	const handleSplitTime = (
		value: string,
		periodIndex: number,
		weekIndex: number,
		dayIndex: number,
		sessionIndex: number,
		splitIndex: number,
	) => {
		dispatch({
			type: 'EDIT_SPLIT_TIME',
			payload: {
				value,
				periodIndex,
				weekIndex,
				dayIndex,
				sessionIndex,
				splitIndex,
			},
		});
	};

	const handleSplitDistance = (
		value: string,
		periodIndex: number,
		weekIndex: number,
		dayIndex: number,
		sessionIndex: number,
		splitIndex: number,
	) => {
		dispatch({
			type: 'EDIT_SPLIT_DISTANCE',
			payload: {
				value,
				periodIndex,
				weekIndex,
				dayIndex,
				sessionIndex,
				splitIndex,
			},
		});
	};

	const handleSessionName = (
		value: string,
		periodIndex: number,
		weekIndex: number,
		dayIndex: number,
		sessionIndex: number,
	) => {
		dispatch({
			type: 'EDIT_SESSION_NAME',
			payload: {
				value,
				periodIndex,
				weekIndex,
				dayIndex,
				sessionIndex,
			},
		});
	};

	const handleDayName = (
		value: string,
		periodIndex: number,
		weekIndex: number,
		dayIndex: number,
	) => {
		dispatch({
			type: 'EDIT_DAY_NAME',
			payload: {
				value,
				periodIndex,
				weekIndex,
				dayIndex,
			},
		});
	};

	const handleWeekName = (
		value: string,
		periodIndex: number,
		weekIndex: number,
	) => {
		dispatch({
			type: 'EDIT_WEEK_NAME',
			payload: {
				value,
				periodIndex,
				weekIndex,
			},
		});
	};

	const handleWeekStart = (startsMonday: boolean) => {
		dispatch({ type: 'CHANGE_WEEK_START', payload: { startsMonday } });
	};

	return (
		<TrainingplanContext.Provider
			value={{
				name: state.name,
				periods: state.periods,
				weekStartMonday: state.weekStartMonday,
				addDay,
				addWeek,
				addSession,
				addSplit,
				addPeriod,
				handleSplitName,
				handleSessionName,
				handleDayName,
				handleWeekName,
				handleWeekStart,
				handleSplitType,
				handleSplitUnit,
				handleSplitTime,
				handleSplitDistance,
			}}
		>
			{children}
		</TrainingplanContext.Provider>
	);
};
