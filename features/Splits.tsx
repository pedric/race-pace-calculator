import { useState, useEffect, useContext } from 'react';
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

const DropZone = styled.div<any>`
	border: 1px solid purple;
	background: blue;
	height: ${({ active }) => (active ? '50px' : '10px')};
	transition: all 250ms linear;
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
	} = useContext<TypeTrainingPlanContext>(TrainingplanContext);

	const [drag, setDrag] = useState<boolean>(false);
	const [dragOver, setIsDraggedOver] = useState<boolean>(false);
	const [dragData, setDraggedData] = useState<any>(null);

	const daytypes = [
		SESSION_TYPES.EASY,
		SESSION_TYPES.MARATHON_PACE,
		SESSION_TYPES.THRESHOLD,
		SESSION_TYPES.INTERVAL,
		SESSION_TYPES.REPETITIONS,
	];

	const units = ['Km', 'Miles', 'Minutes'];

	return (
		<>
			{splits.map((split: TypeSessionSplit, splitIndex: number) => {
				const isMeasuerdByTime = split.unit == 'Minutes';
				return (
					<div key={splitIndex}>
						<DropZone
							onDragOver={(e) => {
								e.preventDefault();
								console.log('drag over');
								setIsDraggedOver(true);
							}}
							active={dragOver}
							onDrop={(e) => {
								e.preventDefault();
								console.log('drop', dragData);
							}}
							// onDragEnter={() => setIsDraggedOver(true)}
							onDragLeave={() => setIsDraggedOver(false)}
						></DropZone>
						<StyledSplit
							draggable={drag}
							onDragStart={() => {
								setDraggedData({ splitIndex, split });
								console.log('drag start', { splitIndex, split });
							}}
							onDragEnd={(e) => setDrag(false)}
						>
							<button onMouseOver={() => setDrag(true)}>DRAG</button>
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
							<select
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
									<option
										key={idx}
										value={splitType}
										selected={splitType == split.intensity}
									>
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
				);
			})}
		</>
	);
};

const UnitButton = styled.span<any>`
	display: inline-block;
	padding: 4px;
	border: 1px dashed green;
	background: ${({ active }) => (active ? 'yellow' : '')};
`;

export default Splits;
