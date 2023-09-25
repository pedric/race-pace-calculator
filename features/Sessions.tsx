import { useState, useEffect, useContext, Fragment } from 'react';
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
import DropZone from '../components/dropZone';
import DraggableContainer from '../components/DraggableContainer';
import Icon from '../components/Icon';

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
		handleDrop,
	} = useContext<TypeTrainingPlanContext>(TrainingplanContext);

	const [dragData, setDraggedData] = useState<any>(null);
	const [open, setOpen] = useState<number[]>([]);

	const handleOpenSessions = (idx: number) => {
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
		handleDrop('SESSION', data, index);
	};

	const onDragStartFunction = (data: any) => {
		setDraggedData(data);
	};

	return (
		<>
			{sessions.map((session: TypeSession, sessionIndex: number) => {
				return (
					<Fragment key={sessionIndex}>
						<DropZone
							type={'SESSION'}
							index={sessionIndex}
							data={dragData}
							onDropFunction={onDropFunction}
						/>
						<DraggableContainer
							periodIndex={periodIndex}
							index={sessionIndex}
							open={isOpen(sessionIndex)}
							type={'SESSION'}
							data={{
								periodIndex,
								weekIndex,
								dayIndex,
								sessionIndex,
								session,
							}}
							buttonText={'Move session'}
							onDragStartFunction={onDragStartFunction}
						>
							{/* <div onClick={() => handleOpenSessions(sessionIndex)}>
								toggle session
								<Icon
									icon={isOpen(sessionIndex) ? 'chevron-down' : 'chevron-up'}
								/>
							</div> */}
							{/* {isOpen(sessionIndex) && (
								<StyledSession>
									<label>session name</label>
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
								</StyledSession> */}
							{/* )} */}
							<p
								onClick={() =>
									addSession(periodIndex, weekIndex, dayIndex, sessionIndex)
								}
							>
								En till session
							</p>
						</DraggableContainer>
						<div onClick={() => handleOpenSessions(sessionIndex)}>
							toggle session
							<Icon
								icon={isOpen(sessionIndex) ? 'chevron-down' : 'chevron-up'}
							/>
						</div>
						{isOpen(sessionIndex) && (
							<>
								<StyledSession>
									<label>session name</label>
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
								</StyledSession>
								{/* <Splits
									splits={session.splits}
									periodIndex={periodIndex}
									weekIndex={weekIndex}
									sessionIndex={sessionIndex}
									dayIndex={dayIndex}
								/> */}
							</>
						)}
					</Fragment>
				);
			})}
		</>
	);
};

const StyledSession = styled.div`
	border: 2px solid pink;
`;

export default Sessions;
