import { useState, useEffect, useContext, Fragment } from 'react';
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
import DropZone from '../components/dropZone';
import DraggableContainer from '../components/DraggableContainer';
import SortableContainer, { ListItem } from '../components/SortableContainer';

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
		handleDrop,
	} = useContext<TypeTrainingPlanContext>(TrainingplanContext);

	const [open, setOpen] = useState<number[]>([]);

	const [dragData, setDraggedData] = useState<any>(null);

	const handleOpenDays = (idx: number) => {
		if (open.some((n) => n === idx)) {
			const newOpen = open.filter((n) => n !== idx);
			setOpen(newOpen);
		} else {
			const newOpen = [...open];
			newOpen.push(idx);
			setOpen(newOpen);
		}
	};

	const isOpen = (n: number) => {
		return open.some((_) => _ == n) ? true : false;
	};

	const onDropFunction = (data: any, index: number) => {
		handleDrop('DAY', data, index);
	};

	const onDragStartFunction = (data: any) => {
		setDraggedData(data);
	};
	const identifiers = days.map(
		(session: TypeDay, dayIndex: number) =>
			`DAY_${periodIndex}_${weekIndex}_${dayIndex}`,
	);

	return (
		<SortableContainer identifiers={identifiers}>
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
					<ListItem
						key={dayIndex}
						identifier={`DAY_${periodIndex}_${weekIndex}_${dayIndex}`}
						type={'DAY'}
						index={dayIndex}
						data={{
							periodIndex,
							weekIndex,
							dayIndex,
							day,
						}}
						name={dayName}
					>
						{/* <DropZone
							type={'DAY'}
							index={dayIndex}
							data={dragData}
							onDropFunction={onDropFunction}
						/>
						<DraggableContainer
							periodIndex={periodIndex}
							index={dayIndex}
							open={isOpen(dayIndex)}
							type={'DAY'}
							data={{
								periodIndex,
								weekIndex,
								dayIndex,
								day,
							}}
							buttonText={'Move day'}
							onDragStartFunction={onDragStartFunction}
						> */}
						<StyledDay restDay={restDay}>
							{dayName && <div>{dayName}</div>}
							{/* <div onClick={() => handleOpenDays(dayIndex)}>
									toggle day
									<Icon
										icon={isOpen(dayIndex) ? 'chevron-down' : 'chevron-up'}
									/>
								</div> */}
							{restDay && <p>REST DAY</p>}
							{/* {isOpen(dayIndex) && (
									<div>
										<input
											type='text'
											value={day.name}
											onChange={(e) =>
												handleDayName(
													e.target.value,
													periodIndex,
													weekIndex,
													dayIndex,
												)
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
									</div>
								)} */}
							{/* <div onClick={() => handleOpenDays(dayIndex)}>
								toggle day tabindex test
								<Icon icon={isOpen(dayIndex) ? 'chevron-down' : 'chevron-up'} />
							</div> */}
						</StyledDay>
						{/* </DraggableContainer> */}
						{/* <div onClick={() => handleOpenDays(dayIndex)}>
							toggle day
							<Icon icon={isOpen(dayIndex) ? 'chevron-down' : 'chevron-up'} />
						</div> */}

						<>
							<div>
								<input
									type='text'
									value={day.name}
									onChange={(e) =>
										handleDayName(
											e.target.value,
											periodIndex,
											weekIndex,
											dayIndex,
										)
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
							</div>
						</>
					</ListItem>
				);
			})}
		</SortableContainer>
	);
};

const StyledDay = styled.div<any>`
	// display: grid;
	background: ${({ restDay }) => (restDay ? '#ccc' : '#fff')};
	border: 1px solid crimson;
`;

export default TrainingDays;
