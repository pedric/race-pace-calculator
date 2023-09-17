import { useState, useEffect, useContext } from 'react';
import { TypeSessionSplit, TypeSession, TypeDay, TypeWeek } from '../types';
import Splits from './Splits';
import Sessions from './Sessions';
import TrainingDays from './TrainingDays';
import Icon from '../components/Icon';
import {
	SESSION_TYPES,
	MEASUREMENT_TYPES,
	TRAINING_PLAN_MEASUREMENT_UNITS,
	weekDays,
	weekDaysStartOnsunday,
} from '../util/constants';
import {
	TypeTrainingPlanContext,
	TrainingplanContext,
} from '../context/traininplan/TrainingPlanContext';
import styled from '@emotion/styled';

type Props = {
	week: TypeWeek;
	periodIndex: number;
	weekIndex: number;
	weekDaySet: string[];
};

const TrainingWeeks = ({ week, periodIndex, weekIndex, weekDaySet }: Props) => {
	const {
		name,
		periods,
		addDay,
		addPeriod,
		addSession,
		addSplit,
		addWeek,
		handleDayName,
		handleSessionName,
		handleSplitName,
		handleWeekName,
	} = useContext<TypeTrainingPlanContext>(TrainingplanContext);

	const [open, setOpen] = useState<boolean>(false);

	const weekIsFull = week.days.length == 7;

	return (
		<>
			<StyledWeek key={weekIndex}>
				vecka
				<input
					type='text'
					value={week.name}
					onChange={(e) =>
						handleWeekName(e.target.value, periodIndex, weekIndex)
					}
				/>
				<div onClick={() => setOpen(!open)}>
					toggle vecka
					<Icon icon={open ? 'chevron-down' : 'chevron-up'} />
				</div>
				<TrainingDays
					days={week.days}
					periodIndex={periodIndex}
					weekIndex={weekIndex}
					weekDaySet={weekDaySet}
				/>
				{!weekIsFull ? (
					<div onClick={() => addDay(periodIndex, weekIndex)}>
						en till dag
						<Icon icon={'plus'} />
					</div>
				) : null}
				<p onClick={() => addWeek(periodIndex, weekIndex)}>En till vecka</p>
			</StyledWeek>
			<p onClick={() => addWeek(periodIndex, weekIndex)}>En till vecka</p>
		</>
	);
};

const StyledWeek = styled.div`
	border: 1px solid green;
`;

export default TrainingWeeks;
