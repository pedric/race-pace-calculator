import { useState, useEffect, useContext } from 'react';
import { TypeSessionSplit, TypeSession } from '../types';
import Splits from './Splits';
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
	sessions: TypeSession[];
	periodIndex: number;
	weekIndex: number;
	dayIndex: number;
};

const Sessions = ({ sessions, periodIndex, weekIndex, dayIndex }: Props) => {
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

	return (
		<>
			{sessions.map((session: TypeSession, sessionIndex: number) => {
				return (
					<StyledSession key={sessionIndex}>
						<input
							type='text'
							value={session.name}
							onChange={(e) =>
								handleSessionName(
									e.target.value,
									periodIndex,
									weekIndex,
									dayIndex,
									sessionIndex,
								)
							}
						/>
						<Splits
							splits={session.splits}
							periodIndex={periodIndex}
							weekIndex={weekIndex}
							sessionIndex={sessionIndex}
							dayIndex={dayIndex}
						/>
						<p
							onClick={() =>
								addSession(periodIndex, weekIndex, dayIndex, sessionIndex)
							}
						>
							En till session
						</p>
					</StyledSession>
				);
			})}
		</>
	);
};

const StyledSession = styled.div`
	border: 2px solid pink;
`;

export default Sessions;
