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
		} else if (val) {
			setRaceDistance(Number(val));
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
							<Select open={open}>
								<Selector onClick={() => setOpen(!open)} role='button'>
									{raceName || 'Choose a distance'}
									<Button>
										<Icon
											icon={open ? 'chevron-up' : 'chevron-down'}
											size={20}
										/>
									</Button>
								</Selector>
								<Options open={open}>
									{distances.map((distance: Distance) => (
										<Option
											key={distance.distance}
											data-value={distance.distance}
											onClick={(e) => setVal(distance.distance)}
										>
											{distance.name}
										</Option>
									))}
								</Options>
							</Select>
						</div>
					)}
					{userMode == INPUT.FREE && (
						<div>
							<div>
								Enter distance in {units == MODE.METRIC ? 'meters' : 'miles'} or{' '}
								<ShowSelectBox
									onClick={() => {
										setVal(0);
										setUserMode(INPUT.SELECT);
									}}
								>
									reset
								</ShowSelectBox>
							</div>
							<input
								type='number'
								value={raceDistance == 0 ? '' : raceDistance}
								onChange={(e) =>
									setVal(
										typeof Number(e.target.value) == 'number'
											? Number(e.target.value)
											: undefined,
									)
								}
							/>
						</div>
					)}
				</form>
			</DistanceControls>
		</>
	);
};

const ShowSelectBox = styled.span``;

const DistanceControls = styled.div`
	select {
		width: 100%;
	}

	input[type='number'] {
		width: 100%;
	}
`;

const Select = styled.div<any>`
	position: relative;
	padding: 0.5em;
	border: ${({ open }) => (open ? `` : `1px solid ${theme.gray}`)};
	border-radius: 4px;
	background: ${theme.white};
`;
const Selector = styled.div``;

const Options = styled.div<any>`
	display: ${({ open }) => (open ? 'block' : 'none')};
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	padding: 1em;
	border: 1px solid ${theme.gray};
	border-radius: 4px;
	background: ${theme.white};
	z-index: 5;
`;
const Option = styled.div`
	line-height: 1.4;
`;
const Button = styled.span`
	position: absolute;
	top: 0;
	right: 4px;
	z-index: 10;
	height: 100%;
	display: grid;
	place-items: center;
`;

export default RaceSelector;
