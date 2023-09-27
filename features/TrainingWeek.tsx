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
import DropZone from '../components/dropZone';
import DraggableContainer from '../components/DraggableContainer';
import SortableContainer, { ListItem } from '../components/SortableContainer';
import { WeekSummary } from '../components/TrainingPlanSummary';

type Props = {
	week: TypeWeek;
	periodIndex: number;
	weekIndex: number;
	weekDaySet: string[];
	dragData: any;
	setDraggedData: (data: any) => void;
};

const TrainingWeeks = ({
	week,
	periodIndex,
	weekIndex,
	weekDaySet,
	dragData,
	setDraggedData,
}: Props) => {
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
		handleDrop,
	} = useContext<TypeTrainingPlanContext>(TrainingplanContext);

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
			{/* <DropZone
				type={'WEEK'}
				index={weekIndex}
				data={dragData}
				onDropFunction={onDropFunction}
			/>
			<DraggableContainer
				periodIndex={periodIndex}
				index={weekIndex}
				open={open}
				type={'WEEK'}
				data={{
					periodIndex: periodIndex,
					weekIndex: weekIndex,
					week: week,
				}}
				buttonText={'Move week'}
				onDragStartFunction={onDragStartFunction}
			> */}
			{/* <div onClick={() => setOpen(!open)}>
				toggle vecka
				<Icon icon={open ? 'chevron-down' : 'chevron-up'} />
			</div> */}
			{/* {open && ( */}
			<StyledWeek key={weekIndex}>
				vecka {weekIndex}
				<input
					type='text'
					value={week.name}
					onChange={(e) =>
						handleWeekName(e.target.value, periodIndex, weekIndex)
					}
				/>
				{/* {!weekIsFull ? (
					<div onClick={() => addDay(periodIndex, weekIndex)}>
						en till dag
						<Icon icon={'plus'} />
					</div>
				) : null} */}
			</StyledWeek>

			{/* </DraggableContainer> */}
			{/* <div onClick={() => setOpen(!open)}>
				toggle vecka
				<Icon icon={open ? 'chevron-down' : 'chevron-up'} />
			</div> */}
			{!weekIsFull ? (
				<div onClick={() => addDay(periodIndex, weekIndex)}>
					en till dag
					<Icon icon={'plus'} />
				</div>
			) : null}
			{/* <TrainingDays
				days={week.days}
				periodIndex={periodIndex}
				weekIndex={weekIndex}
				weekDaySet={weekDaySet}
			/> */}
			<TrainingDays
				days={week.days}
				periodIndex={periodIndex}
				weekIndex={weekIndex}
				weekDaySet={weekDaySet}
			/>
			<WeekSummary periodIndex={periodIndex} weekIndex={weekIndex} />
			<p onClick={() => addWeek(periodIndex, weekIndex)}>En till vecka</p>
		</>
	);
};

const StyledWeek = styled.div`
	border: 1px solid green;
`;

export default TrainingWeeks;
