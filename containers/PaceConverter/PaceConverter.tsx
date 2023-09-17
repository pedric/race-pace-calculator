import { useState, useEffect, useReducer } from 'react';
import Converter from '../../components/Converter';
import {
	kilometerPerHourPaceBasedOnSecondsOnly,
	minutesToSeconds,
	// kilometerPerHourPaceFromMinutesDistanceAndSeconds,
	// kilometerPerHourPaceFromMinutesOnly,
	paceFromKmh,
	paceInmilesFromStateData,
} from '../../util/maths';
import {
	CONVERTION,
	CHANGE_TYPE,
	TIME_UNIT,
	UNITS,
} from '../../util/constants';
import reducer from './reducer';
import styled from '@emotion/styled';
import { Wrapper } from '../../styles/layout';
import { theme } from '../../styles/theme';

const PaceConverter = () => {
	interface State {
		kmh: number;
		mph: number;
		minPerKm: number;
		secPerKm: number;
		minPerMile: number;
		secPerMile: number;
		distance: number;
	}

	const initialState = {
		kmh: 0,
		mph: 0,
		minPerKm: 0,
		secPerKm: 0,
		minPerMile: 0,
		secPerMile: 0,
		distance: 1, // km
	};

	const [shadowState, setShadowState] = useState<State>(initialState);
	const [units, setUnits] = useState<string>(UNITS.METRIC);
	const [convertionType, setConvertionType] = useState<string>(
		CONVERTION.PACE_TO_SPEED_METRIC,
	);
	const [loading, setLoading] = useState<boolean>(false);

	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		dispatch({ type: convertionType, payload: shadowState });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shadowState]);

	useEffect(() => {
		dispatch({ type: CHANGE_TYPE.ALL, payload: null }); // reset on change
		setShadowState(initialState);
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 150);
	}, [convertionType, units]);

	const handleChange = (val: number | string, type: number, unit: string) => {
		const value = typeof val == 'string' ? Number(val) : val;

		switch (type) {
			case CHANGE_TYPE.KMH_TO_PACE:
				setShadowState({ ...shadowState, kmh: value });
				break;
			case CHANGE_TYPE.MINUTE_PER_KM:
				setShadowState({ ...shadowState, minPerKm: value });
				break;
			case CHANGE_TYPE.SECOND_PER_KM:
				setShadowState({ ...shadowState, secPerKm: value });
				break;
			case CHANGE_TYPE.MPH_TO_PACE:
				setShadowState({ ...shadowState, mph: value });
				break;
			case CHANGE_TYPE.MINUTE_PER_MILE:
				setShadowState({ ...shadowState, minPerMile: value });
				break;
			case CHANGE_TYPE.SECOND_PER_MILE:
				setShadowState({ ...shadowState, secPerMile: value });
				break;
			case CHANGE_TYPE.MPH_TO_PACE:
				setShadowState({ ...shadowState, mph: value });
				break;
			default:
				return null;
		}
	};

	const handleUnitChange = () => {
		let newUnit = units;
		let newConversion = convertionType;
		if (convertionType === CONVERTION.PACE_TO_SPEED_METRIC) {
			newConversion = CONVERTION.PACE_TO_SPEED_IMPERIAL;
			newUnit = UNITS.IMPERIAL;
		} else if (convertionType === CONVERTION.SPEED_TO_PACE_METRIC) {
			newConversion = CONVERTION.SPEED_TO_PACE_IMPERIAL;
			newUnit = UNITS.IMPERIAL;
		} else if (convertionType === CONVERTION.PACE_TO_SPEED_IMPERIAL) {
			newConversion = CONVERTION.PACE_TO_SPEED_METRIC;
			newUnit = UNITS.METRIC;
		} else if (convertionType === CONVERTION.SPEED_TO_PACE_IMPERIAL) {
			newConversion = CONVERTION.SPEED_TO_PACE_METRIC;
			newUnit = UNITS.METRIC;
		}

		setConvertionType(newConversion);
		setUnits(newUnit);
	};

	const handleConvertionType = () => {
		let newConversion = convertionType;
		if (convertionType === CONVERTION.PACE_TO_SPEED_METRIC) {
			newConversion = CONVERTION.SPEED_TO_PACE_METRIC;
		} else if (convertionType === CONVERTION.SPEED_TO_PACE_METRIC) {
			newConversion = CONVERTION.PACE_TO_SPEED_METRIC;
		} else if (convertionType === CONVERTION.PACE_TO_SPEED_IMPERIAL) {
			newConversion = CONVERTION.SPEED_TO_PACE_IMPERIAL;
		} else if (convertionType === CONVERTION.SPEED_TO_PACE_IMPERIAL) {
			newConversion = CONVERTION.PACE_TO_SPEED_IMPERIAL;
		}
		setConvertionType(newConversion);
	};

	return (
		<Outer>
			<Wrapper>
				<ConverterMenu>
					<MenuButton
						active={units === UNITS.METRIC}
						role='button'
						onClick={() => handleUnitChange()}
					>
						Metric
					</MenuButton>
					<MenuButton
						active={units === UNITS.IMPERIAL}
						role='button'
						onClick={() => handleUnitChange()}
					>
						Imperial
					</MenuButton>
					<MenuButton
						active={
							convertionType === CONVERTION.SPEED_TO_PACE_IMPERIAL ||
							convertionType === CONVERTION.SPEED_TO_PACE_METRIC
						}
						role='button'
						onClick={() => handleConvertionType()}
					>
						Speed
					</MenuButton>
					<MenuButton
						active={
							convertionType === CONVERTION.PACE_TO_SPEED_IMPERIAL ||
							convertionType === CONVERTION.PACE_TO_SPEED_METRIC
						}
						role='button'
						onClick={() => handleConvertionType()}
					>
						Pace
					</MenuButton>
				</ConverterMenu>
				{loading ? (
					<Loader />
				) : (
					<>
						{convertionType == CONVERTION.SPEED_TO_PACE_METRIC && (
							<>
								<Converter
									convertionType={CONVERTION.SPEED_TO_PACE_METRIC}
									state={shadowState}
									onChangeFunction={handleChange}
									data={state}
								/>
							</>
						)}
						{convertionType == CONVERTION.SPEED_TO_PACE_IMPERIAL && (
							<>
								<Converter
									convertionType={CONVERTION.SPEED_TO_PACE_IMPERIAL}
									state={shadowState}
									onChangeFunction={handleChange}
									data={state}
								/>
							</>
						)}

						{convertionType == CONVERTION.PACE_TO_SPEED_METRIC && (
							<>
								<Converter
									convertionType={CONVERTION.PACE_TO_SPEED_METRIC}
									state={shadowState}
									onChangeFunction={handleChange}
									data={state}
								/>
							</>
						)}
						{convertionType == CONVERTION.PACE_TO_SPEED_IMPERIAL && (
							<>
								<Converter
									convertionType={CONVERTION.PACE_TO_SPEED_IMPERIAL}
									state={shadowState}
									onChangeFunction={handleChange}
									data={state}
								/>
							</>
						)}
					</>
				)}
				{/* <div>DEBUG 👇</div>
				<p>state</p>
				<div>
					<pre>{JSON.stringify(state, null, 2)}</pre>
				</div>
				<p>shadowState</p>
				<div>
					<pre>{JSON.stringify(shadowState, null, 2)}</pre>
				</div>
				<p>convertionType</p>
				<div>
					<pre>{convertionType}</pre>
				</div>
				<p>units</p>
				<div>
					<pre>{units}</pre>
				</div> */}
			</Wrapper>
		</Outer>
	);
};

const ConverterMenu = styled.nav<any>`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 1em;
	margin: 0.5em auto;
`;

const MenuButton = styled.div<any>`
	display: inline-block;
	color: ${({ active }) => (active ? '#fff' : theme.cta)};
	background: ${({ active }) => (active ? theme.cta : '#fff')};
	border: 1px solid ${({ active }) => (active ? '#fff' : theme.cta)};
	text-align: center;
	padding: 0.25em 0.5em;
	border-radius: 9999px;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 300;
	line-height: 1.7;

	&:hover {
		cursor: pointer;
	}
`;

const Outer = styled.div<any>`
	font-family: 'Inter', sans-serif;
	margin: '1em auto';
`;

const Loader = styled.div`
	@keyframes spinnelispin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	position: absolute;
	background: ${theme.white};
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 10;

	&::after {
		content: '';
		position: absolute;
		top: calc(50% - 25px);
		left: calc(50% - 25px);
		width: 50px;
		height: 50px;
		border: 4px solid ${theme.cta};
		border-top: 4px solid transparent;
		border-radius: 9999px;
		animation: spinnelispin 500ms linear infinite;
	}
`;

export default PaceConverter;
