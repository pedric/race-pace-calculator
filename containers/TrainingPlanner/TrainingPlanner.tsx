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
import { theme } from '../../styles/theme';
import { AddButton } from '../../styles/components';

const daytypes = [SESSION_TYPES.EASY, SESSION_TYPES.MARATHON_PACE, SESSION_TYPES.THRESHOLD, SESSION_TYPES.INTERVAL, SESSION_TYPES.REPETITIONS];

const TrainingPlanner = () => {
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
		setStore,
	} = useContext<TypeTrainingPlanContext>(TrainingplanContext);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		let state = urlParams.get('state');
		if (state) {
			setStore(state);
		}
	}, []);

	const [error, setError] = useState<string>('');
	const [applied, setApplied] = useState<boolean>(false);
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	useEffect(() => {
		if (store) {
			setModalOpen(true);
		}
	}, [store]);

	const weekDaySet = weekStartMonday ? weekDays : weekDaysStartOnsunday;

	const identifiers = periods.map((period: TypePeriod, periodIndex: number) => `PERIOD_${periodIndex}`);

	return (
		<Wrapper someThingIsDragged={someThingIsDragged}>
			{store && !applied && (
				<Modal $open={modalOpen}>
					<MadalContent>
						<AddButton
							onClick={() => {
								window.history.pushState({}, document.title, window.location.pathname);
								try {
									resetFromStore(JSON.parse(store));
								} catch (e) {
									setError('Sorry, invalid link');
								}
								setApplied(true);
							}}
						>
							State found, click to apply.
						</AddButton>
						<AddButton
							onClick={() => {
								window.history.pushState({}, document.title, window.location.pathname);
								setApplied(true);
							}}
						>
							Reject
						</AddButton>
					</MadalContent>
				</Modal>
			)}
			{error && <div>{error}</div>}
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
			<RestoreTrainingPlan />
		</Wrapper>
	);
};

const MadalContent = styled.div`
	background: ${theme.white};
	border: 1px solid ${theme.cta};
	border-radius: 4px;
	padding: 2em;
	width: 90%;
	margin: 1em auto;
	max-width: 400px;
`;

const Modal = styled.aside<any>`
	background: #00000078;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: grid;
	place-items: center;
`;

const Wrapper = styled.div<any>`
	margin: 1em auto;
	width: 630px;
	max-width: 96%;
	font-family: 'Inter', sans-serif;
	background: ${({ someThingIsDragged }) => (someThingIsDragged ? 'red' : 'transparent')};
`;

export default TrainingPlanner;
