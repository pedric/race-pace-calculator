import { useState, useEffect, useContext } from 'react';
import {
	TypeSessionSplit,
	TypeSession,
	TypeDay,
	TypeWeek,
	TypePeriod,
} from '../types';
import Splits from './Splits';
import Sessions from './Sessions';
import TrainingDays from './TrainingDays';
import TrainingWeek from './TrainingWeek';
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
	trainingPeriod: TypePeriod;
	periodIndex: number;
	weekDaySet: string[];
};

const TrainingPeriod = ({ trainingPeriod, periodIndex, weekDaySet }: Props) => {
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
			<StyledPeriod>
				en period
				<div role='button' onClick={() => setOpen(!open)}>
					toggle period
					<Icon icon={open ? 'chevron-down' : 'chevron-up'} />
				</div>
				<div>
					{trainingPeriod?.plan
						? trainingPeriod.plan.map((week: TypeWeek, weekIndex: number) => (
								<TrainingWeek
									key={weekIndex}
									week={week}
									periodIndex={periodIndex}
									weekIndex={weekIndex}
									weekDaySet={weekDaySet}
								/>
						  ))
						: null}
				</div>
			</StyledPeriod>

			<p onClick={() => addPeriod()}>En till period</p>
		</>
	);
};

const StyledPeriod = styled.div`
	// display: grid;
	// background: #fff;
	border: 2px dashed cyan;
`;

export default TrainingPeriod;
