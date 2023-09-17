import { useState, useEffect, useContext } from 'react';
import { TypeSessionSplit, TypeSession, TypeDay } from '../types';
import Splits from './Splits';
import Sessions from './Sessions';
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
	days: TypeDay[];
	periodIndex: number;
	weekIndex: number;
	weekDaySet: string[];
};

const TrainingDays = ({ days, periodIndex, weekIndex, weekDaySet }: Props) => {
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

	return (
		<>
			{days.map((day: TypeDay, dayIndex: number) => {
				const dayName = weekDaySet[dayIndex];
				let restDay = true;
				day.sessions.forEach((s: TypeSession) => {
					s.splits.forEach((split: TypeSessionSplit) => {
						if (split.distance || split.minutes) {
							restDay = false;
						}
					});
				});
				return (
					<StyledDay key={dayIndex}>
						{dayName && <div>{dayName}</div>}
						<div onClick={() => setOpen(!open)}>
							toggle day
							<Icon icon={open ? 'chevron-down' : 'chevron-up'} />
						</div>
						{restDay && <p>REST DAY</p>}
						<input
							type='text'
							value={day.name}
							onChange={(e) =>
								handleDayName(e.target.value, periodIndex, weekIndex, dayIndex)
							}
						/>
						<div>
							<Sessions
								sessions={day.sessions}
								periodIndex={periodIndex}
								weekIndex={weekIndex}
								dayIndex={dayIndex}
							/>
						</div>
					</StyledDay>
				);
			})}
		</>
	);
};

const StyledDay = styled.div`
	// display: grid;
	background: #fff;
	border: 1px solid crimson;
`;

export default TrainingDays;
