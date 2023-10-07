import { useState, useEffect, useContext, Fragment } from 'react';
import { TypeSessionSplit } from '../types';
import { SESSION_TYPES, MEASUREMENT_TYPES, TRAINING_PLAN_MEASUREMENT_UNITS, weekDays, weekDaysStartOnsunday } from '../util/constants';
import { TypeTrainingPlanContext, TrainingplanContext } from '../context/traininplan/TrainingPlanContext';
import styled from '@emotion/styled';
import DropZone from '../components/dropZone';
import DraggableContainer from '../components/DraggableContainer';
import Icon from '../components/Icon';
import SortableContainer, { ListItem } from '../components/SortableContainer';
import { AddButton, InputWrapper } from '../styles/components';
import { theme } from '../styles/theme';
import Select from '../components/Select';
import NumberInput from '../components/NumberInput';

type Props = {
	splits: TypeSessionSplit[];
	periodIndex: number;
	weekIndex: number;
	sessionIndex: number;
	dayIndex: number;
};

const StyledSplit = styled.div`
	margin-bottom: 1em;
`;

const Splits = ({ splits, periodIndex, weekIndex, sessionIndex, dayIndex }: Props) => {
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

	const daytypes = [SESSION_TYPES.EASY, SESSION_TYPES.MARATHON_PACE, SESSION_TYPES.THRESHOLD, SESSION_TYPES.INTERVAL, SESSION_TYPES.REPETITIONS];

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

	const identifiers = splits.map((split: TypeSessionSplit, splitIndex: number) => `SPLIT_${periodIndex}_${weekIndex}_${dayIndex}_${sessionIndex}_${splitIndex}`);

	return (
		<>
			<SortableContainer identifiers={identifiers}>
				{splits.map((split: TypeSessionSplit, splitIndex: number) => {
					const isMeasuerdByTime = split.unit == 'Minutes';
					return (
						<ListItem
							data-type={'SPLIT'}
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
							name={split.name}
						>
							<StyledSplit>
								<InputWrapper>
									<label>split name</label>
									<input type='text' value={split.name} onChange={(e) => handleSplitName(e.target.value, periodIndex, weekIndex, dayIndex, sessionIndex, splitIndex)} />
								</InputWrapper>
								<InputWrapper>
									<label>Split Intensity</label>
									<Select options={daytypes} handleSelect={handleSplitType} data={{ periodIndex, weekIndex, dayIndex, sessionIndex, splitIndex }} selectedOption={split.intensity} />
								</InputWrapper>
								<div>
									{isMeasuerdByTime && (
										<InputWrapper>
											<label>Minutes</label>
											<NumberInput label={split.unit} value={split.minutes} data={{ periodIndex, weekIndex, dayIndex, sessionIndex, splitIndex }} onChangeFunction={handleSplitDistance} />
											{/* <input type='number' value={split.minutes} onChange={(e) => handleSplitTime(e.target.value, periodIndex, weekIndex, dayIndex, sessionIndex, splitIndex)} /> */}
										</InputWrapper>
									)}
									{!isMeasuerdByTime && (
										<InputWrapper>
											<label>Distance {split.unit}</label>
											<NumberInput label={split.unit} value={split.distance} data={{ periodIndex, weekIndex, dayIndex, sessionIndex, splitIndex }} onChangeFunction={handleSplitDistance} />
											{/* <input type='number' value={split.distance} onChange={(e) => handleSplitDistance(e.target.value, periodIndex, weekIndex, dayIndex, sessionIndex, splitIndex)} /> */}
										</InputWrapper>
									)}
									{units.map((_: string, idx: number) => (
										<UnitButton key={idx} role='button' active={_ == split.unit} onClick={() => handleSplitUnit(_, periodIndex, weekIndex, dayIndex, sessionIndex, splitIndex)}>
											{_}
										</UnitButton>
									))}
								</div>
							</StyledSplit>
						</ListItem>
					);
				})}
			</SortableContainer>
			<AddButton role='button' onClick={() => addSplit(periodIndex, weekIndex, dayIndex, sessionIndex)}>
				Add split
			</AddButton>
		</>
	);
};

const UnitButton = styled.span<any>`
	display: inline-block;
	padding: 4px;
	border: 1px solid ${({ active }) => (active ? theme.white : theme.cta)};
	background: ${({ active }) => (active ? theme.cta : theme.white)};
	color: ${({ active }) => (active ? theme.white : theme.cta)};
	text-align: center;
	padding: 0.25em 0.5em;
	border-radius: 9999px;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 300;
	line-height: 1.7;
	margin: 0 0.25em;

	&:hover {
		cursor: pointer;
	}
`;

export default Splits;
