import styled from '@emotion/styled';
import distances, { Distance, DISTANCE } from '../util/distances';
import { PaceData, Pace } from '../types';
import { useEffect, useState } from 'react';
import Icon from './Icon';
import { theme } from '../styles/theme';
import { INPUT, MODE } from '../util/constants';
import {
	paceInKmFromStateData,
	paceInmilesFromStateData,
	metersToMilesToCalcMilePace,
	metersToMiles,
	milesToMeters,
	kilometerPerHourPace,
	milesPerHourPace,
	metersToKilometers,
	kilometresTometers,
} from '../util/maths';

interface RaceProps {
	data: PaceData;
	value?: number;
	imperialValue?: number;
	userMode: string;
	units: string;
	raceDistance: number;
	handleChange: (value: number) => void;
	setRaceDistance: (value: number) => void;
	setUserMode: (value: string) => void;
}

const RaceSelector = ({
	data,
	value,
	imperialValue,
	userMode,
	units,
	raceDistance,
	handleChange,
	setRaceDistance,
	setUserMode,
}: RaceProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const [val, setVal] = useState<number | string | undefined>(value);

	useEffect(() => {
		setOpen(false);
	}, [value]);

	useEffect(() => {
		if (val === DISTANCE.OTHER) {
			setUserMode(INPUT.FREE);
		} else if (val && typeof val == 'number') {
			const meters = userMode == INPUT.FREE ? metersToKilometers(val) : val;
			setRaceDistance(Number(meters));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [val]);

	const match = distances.find((_) => _.distance == val);
	const raceName = match?.name ? match.name : null;

	return (
		<>
			<DistanceControls>
				<form action='#' onSubmit={(e) => e.preventDefault()}>
					{userMode == INPUT.SELECT && (
						<div>
							<FlexBox>
								<SelectWrap open={open}>
									<Select onClick={() => setOpen(!open)} role='button'>
										{!open && <span>{raceName || 'Distance'}</span>}
										<Button>
											<Icon icon={'chevron-down'} size={20} />
										</Button>
									</Select>
								</SelectWrap>
								<SwitchModeButton onClick={() => setUserMode(INPUT.FREE)}>
									<span>...|</span>
								</SwitchModeButton>
							</FlexBox>
							<Options open={open}>
								<CloseOption onClick={() => setOpen(!open)} role='button'>
									<Icon icon={'x'} size={20} />
								</CloseOption>
								{distances.map((distance: Distance, idx: number) => (
									<Option
										key={distance.distance}
										data-value={distance.distance}
										onClick={(e) => setVal(distance.distance)}
										even={idx % 2 == 0}
									>
										{distance.name}
									</Option>
								))}
							</Options>
						</div>
					)}
					{userMode == INPUT.FREE && (
						<FreeEnterWrapper>
							<input
								type='number'
								placeholder={'Enter distance'}
								value={
									raceDistance == 0 ? '' : kilometresTometers(raceDistance)
								}
								onChange={(e) =>
									setVal(
										typeof Number(e.target.value) == 'number'
											? Number(e.target.value)
											: undefined,
									)
								}
							/>
							<SwitchModeButton onClick={() => setUserMode(INPUT.SELECT)}>
								<Icon icon={'menu'} size={16} />
							</SwitchModeButton>
						</FreeEnterWrapper>
					)}
				</form>
			</DistanceControls>
		</>
	);
};

const FreeEnterWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	width: 100%;

	input[type='number'] {
		width: 60%;
		appearance: textField;
		flex: 1 1 auto;
		min-height: 42px;
		padding: 0.5em 1em;
		border: 0;
		background: ${theme.gray};
		color: ${theme.black};
		border-radius: 9999px;
		margin-right: 0.5em;

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}

		&::placeholder {
			color: ${theme.black};
		}
	}
`;

const Span = styled.span`
	color: #757575;
`;

const FlexBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	width: 100%;
`;

const DistanceControls = styled.div`
	form {
		position: relative;
	}

	select {
		width: 100%;
	}
`;

const SelectWrap = styled.div<any>`
	position: relative;
	padding: 0.75em 1em;
	border-radius: 9999px;
	background: ${({ open }) => (open ? theme.white : theme.gray)};
	min-height: 42px;
	width: 60%;
	flex: 1 1 auto;
	margin-right: 0.5em;

	&:hover {
		background: ${theme.cta};
		color: ${theme.white};
		cursor: pointer;
	}
`;

const Select = styled.div<any>`
	// background: ${theme.gray};
	// width: 60%;
`;

const SwitchModeButton = styled.div<any>`
	// position: relative;
	padding: 0.75em 1em;
	border-radius: 9999px;
	background: ${theme.gray};
	color: ${theme.black};
	min-height: 42px;
	width: 20%;
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		background: ${theme.cta};
		color: ${theme.white};
		cursor: pointer;
	}
`;

const Options = styled.div<any>`
	display: ${({ open }) => (open ? 'block' : 'none')};
	position: absolute;
	// padding-top: 42px;
	top: 0;
	right: 0;
	left: 0;
	// padding: 1em;
	border: 1px solid ${theme.gray};
	border-radius: 20px;
	overflow: hidden;
	background: ${theme.white};
	z-index: 5;
`;

const CloseOption = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 0.5em 1em;

	&:hover {
		background: ${theme.cta};
		color: ${theme.white};
		cursor: pointer;
	}
`;

const Option = styled.div<any>`
	background: ${({ even }) => (even ? theme.gray : theme.white)};
	padding: 0.5em 1em;
	line-height: 1.4;

	&:hover {
		background: ${theme.cta};
		color: ${theme.white};
		cursor: pointer;
	}
`;
const Button = styled.span`
	position: absolute;
	top: 0;
	right: 16px;
	z-index: 1;
	height: 100%;
	display: grid;
	place-items: center;
`;

export default RaceSelector;
