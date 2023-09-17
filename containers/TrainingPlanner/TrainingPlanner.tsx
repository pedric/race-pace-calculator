import { useEffect, useState, useReducer, useContext } from 'react';
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

	const weekDaySet = weekStartMonday ? weekDays : weekDaysStartOnsunday; //TODO: move to context

	return (
		<Wrapper>
			<div>
				<WeekdayButton
					role='button'
					onClick={() => handleWeekStart(true)}
					active={weekStartMonday}
				>
					Week starts with monday
				</WeekdayButton>
				<WeekdayButton
					role='button'
					onClick={() => handleWeekStart(false)}
					active={!weekStartMonday}
				>
					Week starts with sunday
				</WeekdayButton>
			</div>
			{periods &&
				periods.map((trainingPeriod: TypePeriod, periodIndex: number) => (
					<TrainingPeriod
						key={periodIndex}
						trainingPeriod={trainingPeriod}
						periodIndex={periodIndex}
						weekDaySet={weekDaySet}
					/>
				))}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	border: 2px dashed black;
	min-width: 300px;
`;

const WeekdayButton = styled.span<any>`
	border: 2px dashed black;
	background: ${({ active }) => (active ? 'pink' : 'white')};
`;

export default TrainingPlanner;
