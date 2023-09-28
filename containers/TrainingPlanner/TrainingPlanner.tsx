import { useEffect, useState, useReducer, useContext } from 'react';
// import { DndContext, useDndMonitor } from '@dnd-kit/core';
import DragAndDropcontext from '../../context/traininplan/DragAndDropcontext';
import { TrainingplanContext, TypeTrainingPlanContext } from '../../context/traininplan/TrainingPlanContext';
import { SESSION_TYPES, MEASUREMENT_TYPES, TRAINING_PLAN_MEASUREMENT_UNITS, weekDays, weekDaysStartOnsunday } from '../../util/constants';
// import Splits from '../../features/Splits';
import Sessions from '../../features/Sessions';
import TrainingDays from '../../features/TrainingDays';
import TrainingWeek from '../../features/TrainingWeek';
import TrainingPeriod from '../../features/TrainingPeriod';
import styled from '@emotion/styled';
import TrainingPlannerMenu from '../../components/TrainingPlannerMenu';
import RestoreTrainingPlan from '../../components/RestoreTrainingPlan';
import { TypeTrainingPlanState, TypePeriod, TypeWeek, TypeDay, TypeSession, TypeSessionSplit } from '../../types';
import { defaultSplit, defaultSession, defaultPeriod } from './defaults';
import Icon from '../../components/Icon';
import SortableContainer, { ListItem } from '../../components/SortableContainer';
import { AddButton } from '../../styles/components';

const daytypes = [SESSION_TYPES.EASY, SESSION_TYPES.MARATHON_PACE, SESSION_TYPES.THRESHOLD, SESSION_TYPES.INTERVAL, SESSION_TYPES.REPETITIONS];

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
		store,
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
		resetFromStore,
	} = useContext<TypeTrainingPlanContext>(TrainingplanContext);

	const weekDaySet = weekStartMonday ? weekDays : weekDaysStartOnsunday;

	const identifiers = periods.map((period: TypePeriod, periodIndex: number) => `PERIOD_${periodIndex}`);

	return (
		<Wrapper someThingIsDragged={someThingIsDragged}>
			<TrainingPlannerMenu weekStartMonday={weekStartMonday} handleWeekStart={handleWeekStart} />
			<SortableContainer identifiers={identifiers}>
				{periods &&
					periods.map((trainingPeriod: TypePeriod, periodIndex: number) => (
						<ListItem data-type='PERIOD' identifier={`PERIOD_${periodIndex}`} key={periodIndex} index={periodIndex} type={'PERIOD'} data={{ periodIndex, trainingPeriod }} name={trainingPeriod.name}>
							<TrainingPeriod trainingPeriod={trainingPeriod} periodIndex={periodIndex} weekDaySet={weekDaySet} />
						</ListItem>
					))}
			</SortableContainer>
			<AddButton onClick={() => addPeriod()}>Add period</AddButton>
			{/* <button onClick={() => console.log(periods)}>DEBUG STATE</button> */}
			{store && <AddButton onClick={() => resetFromStore(JSON.parse(store))}>Reset from store</AddButton>}
			<RestoreTrainingPlan />
		</Wrapper>
	);
};

const Wrapper = styled.div<any>`
	margin: 1em auto;
	width: 630px;
	max-width: 96%;
	font-family: 'Inter', sans-serif;
	background: ${({ someThingIsDragged }) => (someThingIsDragged ? 'red' : 'transparent')};
`;

export default TrainingPlanner;
