import { useEffect, useState, useReducer, useContext } from 'react';
// import { DndContext, useDndMonitor } from '@dnd-kit/core';
import {
	TrainingplanContext,
	TypeTrainingPlanContext,
} from '../../context/traininplan/TrainingPlanContext';
import {
	SESSION_TYPES,
	MEASUREMENT_TYPES,
	TRAINING_PLAN_MEASUREMENT_UNITS,
	weekDays,
	weekDaysStartOnsunday,
} from '../../util/constants';
// import Splits from '../../features/Splits';
import Sessions from '../../features/Sessions';
import TrainingDays from '../../features/TrainingDays';
import TrainingWeek from '../../features/TrainingWeek';
import TrainingPeriod from '../../features/TrainingPeriod';
import styled from '@emotion/styled';
import TrainingPlannerMenu from '../../components/TrainingPlannerMenu';

import {
	TypeTrainingPlanState,
	TypePeriod,
	TypeWeek,
	TypeDay,
	TypeSession,
	TypeSessionSplit,
} from '../../types';
import { defaultSplit, defaultSession, defaultPeriod } from './defaults';
import Icon from '../../components/Icon';

const daytypes = [
	SESSION_TYPES.EASY,
	SESSION_TYPES.MARATHON_PACE,
	SESSION_TYPES.THRESHOLD,
	SESSION_TYPES.INTERVAL,
	SESSION_TYPES.REPETITIONS,
];

const TrainingPlanner = () => {
	// const initialState: TypeTrainingPlanState = {
	// 	name: '',
	// 	periods: [defaultPeriod()],
	// };

	const {
		name,
		periods,
		weekStartMonday,
		someThingIsDragged,
		addDay,
		addPeriod,
		addSession,
		addSplit,
		addWeek,
		handleDayName,
		handleSessionName,
		handleSplitName,
		handleWeekName,
		handleWeekStart,
	} = useContext<TypeTrainingPlanContext>(TrainingplanContext);

	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		const json = localStorage.getItem('training-schema-periods');
		// console.log('local storage', json);
	}, []);

	useEffect(() => {
		localStorage.setItem('training-schema-periods', JSON.stringify(periods));
		// console.log(periods);
	}, [periods]);

	const weekDaySet = weekStartMonday ? weekDays : weekDaysStartOnsunday;

	console.log('someThingIsDragged', someThingIsDragged);

	return (
		<Wrapper someThingIsDragged={someThingIsDragged}>
			<TrainingPlannerMenu
				weekStartMonday={weekStartMonday}
				handleWeekStart={handleWeekStart}
			/>
			{periods &&
				periods.map((trainingPeriod: TypePeriod, periodIndex: number) => (
					<TrainingPeriod
						key={periodIndex}
						trainingPeriod={trainingPeriod}
						periodIndex={periodIndex}
						weekDaySet={weekDaySet}
					/>
				))}
			<button onClick={() => console.log(periods)}>DEBUG STATE</button>
		</Wrapper>
	);
};

const Wrapper = styled.div<any>`
	margin: 1em auto;
	width: 630px;
	max-width: 96%;
	font-family: 'Inter', sans-serif;
	background: ${({ someThingIsDragged }) =>
		someThingIsDragged ? 'red' : 'transparent'};
`;

export default TrainingPlanner;
