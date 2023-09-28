import { useState, useEffect, useContext } from 'react';
import { TypeSessionSplit, TypeSession, TypeDay, TypeWeek } from '../types';
import Splits from './Splits';
import Sessions from './Sessions';
import TrainingDays from './TrainingDays';
import Icon from '../components/Icon';
import { SESSION_TYPES, MEASUREMENT_TYPES, TRAINING_PLAN_MEASUREMENT_UNITS, weekDays, weekDaysStartOnsunday } from '../util/constants';
import { TypeTrainingPlanContext, TrainingplanContext } from '../context/traininplan/TrainingPlanContext';
import styled from '@emotion/styled';
import DropZone from '../components/dropZone';
import DraggableContainer from '../components/DraggableContainer';
import SortableContainer, { ListItem } from '../components/SortableContainer';
import { WeekSummary } from '../components/TrainingPlanSummary';
import { AddButton, InputWrapper } from '../styles/components';

type Props = {
	week: TypeWeek;
	periodIndex: number;
	weekIndex: number;
	weekDaySet: string[];
	dragData: any;
	setDraggedData: (data: any) => void;
};

const TrainingWeeks = ({ week, periodIndex, weekIndex, weekDaySet, dragData, setDraggedData }: Props) => {
	const { name, periods, addDay, addPeriod, addSession, addSplit, addWeek, handleDayName, handleSessionName, handleSplitName, handleWeekName, handleDrop } =
		useContext<TypeTrainingPlanContext>(TrainingplanContext);

	const [open, setOpen] = useState<boolean>(false);

	const onDropFunction = (data: any, index: number) => {
		handleDrop('WEEK', data, index);
	};

	const onDragStartFunction = (data: any) => {
		setDraggedData(data);
	};

	const weekIsFull = week.days.length == 7;

	return (
		<>
			<StyledWeek key={weekIndex}>
				<InputWrapper>
					<label>Week name, no.{weekIndex + 1}</label>
					<input type='text' value={week.name} onChange={(e) => handleWeekName(e.target.value, periodIndex, weekIndex)} />
				</InputWrapper>
				<TrainingDays weekIsFull={weekIsFull} days={week.days} periodIndex={periodIndex} weekIndex={weekIndex} weekDaySet={weekDaySet} />
			</StyledWeek>

			{/* {!weekIsFull ? (
				<div onClick={() => addDay(periodIndex, weekIndex)}>
					en till dag
					<Icon icon={'plus'} />
				</div>
			) : null} */}

			{/* <TrainingDays
				days={week.days}
				periodIndex={periodIndex}
				weekIndex={weekIndex}
				weekDaySet={weekDaySet}
			/> */}

			<AddButton onClick={() => addWeek(periodIndex, weekIndex)}>Add week</AddButton>
			<WeekSummary periodIndex={periodIndex} weekIndex={weekIndex} />
		</>
	);
};

const StyledWeek = styled.div`
	margin-bottom: 1em;
`;

export default TrainingWeeks;
