import { useState, useEffect, useContext, Fragment } from 'react';
import { TypeSessionSplit } from '../types';
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
import Icon from '../components/Icon';
import SortableContainer, { ListItem } from '../components/SortableContainer';

type Props = {
	splits: TypeSessionSplit[];
	periodIndex: number;
	weekIndex: number;
	sessionIndex: number;
	dayIndex: number;
};

const StyledSplit = styled.div`
	border: 1px solid purple;
`;

const DropZones = styled.div<any>`
	position: relative;
	height: 20px;

	div {
		position: absolute;
		border: 1px solid purple;
		background: blue;
		height: ${({ active }) => (active ? '100px' : '10px')};
		left: 0;
		right: 0;
		top: ${({ active }) => (active ? '-50px' : '0')};
		bottom: ${({ active }) => (active ? '-50px' : '0')};
		transition: all 250ms linear;
	}
`;

const Splits = ({
	splits,
	periodIndex,
	weekIndex,
	sessionIndex,
	dayIndex,
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
		handleSplitType,
		handleSplitUnit,
		handleSplitTime,
		handleSplitDistance,
		handleDrop,
	} = useContext<TypeTrainingPlanContext>(TrainingplanContext);

	const [dragData, setDraggedData] = useState<any>(null);
	const [open, setOpen] = useState<number[]>([]);

	const daytypes = [
		SESSION_TYPES.EASY,
		SESSION_TYPES.MARATHON_PACE,
		SESSION_TYPES.THRESHOLD,
		SESSION_TYPES.INTERVAL,
		SESSION_TYPES.REPETITIONS,
	];

	const units = ['Km', 'Miles', 'Minutes'];

	const handleOpenSplits = (idx: number) => {
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
		handleDrop('SPLIT', data, index);
	};

	const onDragStartFunction = (data: any) => {
		setDraggedData(data);
	};

	const identifiers = splits.map(
		(split: TypeSessionSplit, splitIndex: number) =>
			`SPLIT_${periodIndex}_${weekIndex}_${dayIndex}_${sessionIndex}_${splitIndex}`,
	);

	return (
		<SortableContainer identifiers={identifiers}>
			{splits.map((split: TypeSessionSplit, splitIndex: number) => {
				const isMeasuerdByTime = split.unit == 'Minutes';
				return (
					<ListItem
						identifier={`SPLIT_${periodIndex}_${weekIndex}_${dayIndex}_${sessionIndex}_${splitIndex}`}
						key={splitIndex}
						type={'SPLIT'}
						index={splitIndex}
						data={{
							periodIndex,
							weekIndex,
							dayIndex,
							sessionIndex,
							splitIndex,
							split,
						}}
					>
						<div>
							{/* <div onClick={() => handleOpenSplits(splitIndex)}>
								toggle split
								<Icon
									icon={isOpen(splitIndex) ? 'chevron-down' : 'chevron-up'}
								/>
							</div> */}

							<StyledSplit>
								<small>Name</small>
								<input
									type='text'
									value={split.name}
									onChange={(e) =>
										handleSplitName(
											e.target.value,
											periodIndex,
											weekIndex,
											dayIndex,
											sessionIndex,
											splitIndex,
										)
									}
								/>
								<small>intensity</small>
								<p>I am {split.intensity}</p>
								<select
									defaultValue={split.intensity}
									onChange={(e) => {
										handleSplitType(
											daytypes[e.target.selectedIndex],
											periodIndex,
											weekIndex,
											dayIndex,
											sessionIndex,
											splitIndex,
										);
									}}
								>
									{daytypes.map((splitType: string, idx) => (
										<option key={idx} value={splitType}>
											{splitType}
										</option>
									))}
								</select>
								<div>
									<small>Set units</small>
									{units.map((_: string, idx: number) => (
										<UnitButton
											key={idx}
											role='button'
											active={_ == split.unit}
											onClick={() =>
												handleSplitUnit(
													_,
													periodIndex,
													weekIndex,
													dayIndex,
													sessionIndex,
													splitIndex,
												)
											}
										>
											{_}
										</UnitButton>
									))}
									{isMeasuerdByTime && (
										<>
											<small>Minutes</small>
											<input
												type='number'
												value={split.minutes}
												onChange={(e) =>
													handleSplitTime(
														e.target.value,
														periodIndex,
														weekIndex,
														dayIndex,
														sessionIndex,
														splitIndex,
													)
												}
											/>
										</>
									)}
									{!isMeasuerdByTime && (
										<>
											<small>Distance</small>
											<input
												type='number'
												value={split.distance}
												onChange={(e) =>
													handleSplitDistance(
														e.target.value,
														periodIndex,
														weekIndex,
														dayIndex,
														sessionIndex,
														splitIndex,
													)
												}
											/>
										</>
									)}
								</div>
							</StyledSplit>

							{/* <div onClick={() => handleOpenSplits(splitIndex)}>
								toggle split
								<Icon
									icon={isOpen(splitIndex) ? 'chevron-down' : 'chevron-up'}
								/>
							</div> */}
							<p
								onClick={() =>
									addSplit(
										periodIndex,
										weekIndex,
										dayIndex,
										sessionIndex,
										splitIndex,
									)
								}
							>
								En till split
							</p>
						</div>
					</ListItem>
				);
			})}
		</SortableContainer>
	);
};

const UnitButton = styled.span<any>`
	display: inline-block;
	padding: 4px;
	border: 1px dashed green;
	background: ${({ active }) => (active ? 'yellow' : '')};
`;

export default Splits;
