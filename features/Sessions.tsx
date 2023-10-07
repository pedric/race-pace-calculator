import { useState, useEffect, useContext, Fragment } from 'react';
import { TypeSessionSplit, TypeSession } from '../types';
import Splits from './Splits';
import { SESSION_TYPES, MEASUREMENT_TYPES, TRAINING_PLAN_MEASUREMENT_UNITS, weekDays, weekDaysStartOnsunday } from '../util/constants';
import { TypeTrainingPlanContext, TrainingplanContext } from '../context/traininplan/TrainingPlanContext';
import styled from '@emotion/styled';
import DropZone from '../components/dropZone';
import DraggableContainer from '../components/DraggableContainer';
import Icon from '../components/Icon';
import SortableContainer, { ListItem } from '../components/SortableContainer';
import { AddButton, InputWrapper } from '../styles/components';
import { SessionSummary } from '../components/TrainingPlanSummary';

type Props = {
	sessions: TypeSession[];
	periodIndex: number;
	weekIndex: number;
	dayIndex: number;
};

const Sessions = ({ sessions, periodIndex, weekIndex, dayIndex }: Props) => {
	const { name, periods, addDay, addPeriod, addSession, addSplit, addWeek, handleDayName, handleSessionName, handleSplitName, handleWeekName, handleDrop } =
		useContext<TypeTrainingPlanContext>(TrainingplanContext);

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

	const identifiers = sessions.map((session: TypeSession, sessionIndex: number) => `SESSION_${periodIndex}_${weekIndex}_${dayIndex}_${sessionIndex}`);

	return (
		<>
			<SortableContainer identifiers={identifiers}>
				{sessions.map((session: TypeSession, sessionIndex: number) => {
					return (
						<Fragment key={sessionIndex}>
							<ListItem
								data-type='SESSION'
								identifier={`SESSION_${periodIndex}_${weekIndex}_${dayIndex}_${sessionIndex}`}
								type={'SESSION'}
								data={{
									periodIndex,
									weekIndex,
									dayIndex,
									sessionIndex,
									session,
								}}
								index={sessionIndex}
								key={sessionIndex}
								name={session.name}
							>
								<StyledSession>
									<InputWrapper>
										<label>session name</label>
										<input type='text' value={session.name} onChange={(e) => handleSessionName(e.target.value, periodIndex, weekIndex, dayIndex, sessionIndex)} />
									</InputWrapper>
									<Splits splits={session.splits} periodIndex={periodIndex} weekIndex={weekIndex} sessionIndex={sessionIndex} dayIndex={dayIndex} />
								</StyledSession>
							</ListItem>
							{/* <Splits
								splits={session.splits}
								periodIndex={periodIndex}
								weekIndex={weekIndex}
								sessionIndex={sessionIndex}
								dayIndex={dayIndex}
							/> */}
							<SessionSummary periodIndex={periodIndex} weekIndex={weekIndex} dayIndex={dayIndex} sessionIndex={sessionIndex} />
						</Fragment>
					);
				})}
			</SortableContainer>
			<AddButton role='button' onClick={() => addSession(periodIndex, weekIndex, dayIndex)}>
				Add session
			</AddButton>
		</>
	);
};

const StyledSession = styled.div`
	margin-bottom: 1rem;
`;

export default Sessions;
