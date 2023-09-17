import styled from '@emotion/styled';
import { CONVERTION, CHANGE_TYPE, TIME_UNIT } from '../util/constants';
import { theme } from '../styles/theme';

const PaceToSpeed = ({ type, value, unit, handleChange }: any) => {
	let label = '';
	switch (type) {
		case CHANGE_TYPE.KMH_TO_PACE:
			label = 'kmh';
			break;
		case CHANGE_TYPE.MPH_TO_PACE:
			label = 'mph';
			break;
		case CHANGE_TYPE.SECOND_PER_KM || CHANGE_TYPE.SECOND_PER_MILE:
			label = 'sec';
			break;
		case CHANGE_TYPE.MINUTE_PER_KM || CHANGE_TYPE.MINUTE_PER_MILE:
			label = 'min';
			break;
		default:
			console.log('Not a valid label type');
			break;
	}

	value = typeof value == 'string' ? parseInt(value) : value;
	return (
		<Grid>
			<Controls>
				<Button
					role='button'
					onClick={() => {
						const newValue = value - 5;
						if (newValue > -1) {
							handleChange(newValue, type, unit);
						}
					}}
				>
					-5
				</Button>
				<Button
					role='button'
					onClick={() => {
						const newValue = value - 1;
						if (newValue > -1) {
							handleChange(newValue, type, unit);
						}
					}}
				>
					-1
				</Button>
				<Button
					role='button'
					onClick={() => {
						const newValue = value - 0.5;
						if (newValue > -1) {
							handleChange(newValue, type, unit);
						}
					}}
				>
					-0.5
				</Button>
			</Controls>
			<Box>
				<Number>{value}</Number>
				<Label>{label}</Label>
			</Box>
			<Controls>
				<Button
					role='button'
					onClick={() => {
						const newValue = value + 0.5;
						if (newValue <= 60) {
							handleChange(newValue, type, unit);
						}
					}}
				>
					+0.5
				</Button>
				<Button
					role='button'
					onClick={() => {
						const newValue = value + 1;
						if (newValue <= 60) {
							handleChange(newValue, type, unit);
						}
					}}
				>
					+1
				</Button>
				<Button
					role='button'
					onClick={() => {
						const newValue = value + 5;
						if (newValue <= 60) {
							handleChange(newValue, type, unit);
						}
					}}
				>
					+5
				</Button>
			</Controls>
		</Grid>
	);
};

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	justify-content: center;
	align-items: center;
	margin: 1em auto;
	min-height: 40px;
`;

const Controls = styled.div`
	display: flex;
	justify-content: center;
`;
const Box = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Number = styled.div`
	color: ${theme.cta};
`;

const Label = styled.div`
	font-size: 12px;
	margin-left: 0.5em;
`;

const Button = styled.div<any>`
	background: ${theme.cta};
	color: ${theme.white};
	width: 40px;
	height: 40px;
	display: grid;
	place-items: center;
	border-radius: 9999px;
	margin: 0 8px;
	font-sixe: 12px;
	font-weight: 300;
	cursor: pointer;
	transition: all 250ms ease-in-out;

	&:hover {
		transform: scale(1.1);
	}
`;

const StyledResult = styled.div`
	font-size: 2em;
	text-align: center;
	color: ${theme.cta};
	border-top: 1px solid ${theme.accent};
	padding: 0.5em 0;
	margin: 0.5em 0;
`;

const Result = ({ _, type }: any) => {
	const fallBack = '...';
	let result = '';
	switch (type) {
		case 'KMH':
			result = `${
				!isNaN(_.minPerKm) && _.minPerKm !== Infinity ? `${_.minPerKm} m` : ''
			} ${
				!isNaN(_.secPerKm) && _.secPerKm !== Infinity ? `${_.secPerKm} s` : ''
			} /Km`;
			break;
		case 'MPH':
			result =
				_.kmh && _.kmh !== Infinity ? `${_.kmh.toFixed(2)} kmh` : fallBack;
			break;
		case 'SPEED_METRIC':
			result =
				_.mph && _.mph !== Infinity ? `${_.mph.toFixed(2)} mph` : fallBack;
			break;
		case 'SPEED_IMPERIAL':
			result = `${
				!isNaN(_.minPerMile) && _.minPerMile !== Infinity
					? `${_.minPerMile} m`
					: ''
			} ${
				!isNaN(_.secPerMile) && _.secPerMile !== Infinity
					? `${_.secPerMile} s`
					: ''
			} /Mile`;
			break;
		default:
			result = 'Waiting for inut';
			break;
	}

	return <StyledResult>{result}</StyledResult>;
};

const StyledHelp = styled.div`
	text-align: center;
	color: ${theme.cta};
	font-size: 14px;
	font-weight: 100;
`;

const Help = ({ str }: { str: string }) => {
	return <StyledHelp>{str}</StyledHelp>;
};

const Converter = ({ state, data, onChangeFunction, convertionType }: any) => {
	const handleChange = (val: number, type: number, unit: string) => {
		if (val > -1) {
			onChangeFunction(val, type, unit);
		}
	};

	return (
		<div>
			{convertionType == CONVERTION.PACE_TO_SPEED_METRIC && (
				<>
					<PaceToSpeed
						type={CHANGE_TYPE.MINUTE_PER_KM}
						value={state.minPerKm}
						handleChange={handleChange}
						unit={TIME_UNIT.M}
					/>
					<PaceToSpeed
						type={CHANGE_TYPE.SECOND_PER_KM}
						value={state.secPerKm}
						handleChange={handleChange}
						unit={TIME_UNIT.S}
					/>
					<Help str={'Enter your time per km'} />
					<Result _={data} type={'KMH'} />
				</>
			)}
			{convertionType == CONVERTION.PACE_TO_SPEED_IMPERIAL && (
				<>
					<PaceToSpeed
						type={CHANGE_TYPE.MINUTE_PER_MILE}
						value={state.minPerMile}
						handleChange={handleChange}
						unit={TIME_UNIT.M}
					/>
					<PaceToSpeed
						type={CHANGE_TYPE.SECOND_PER_MILE}
						value={state.secPerMile}
						handleChange={handleChange}
						unit={TIME_UNIT.S}
					/>
					<Help str={'Enter your time per mile'} />
					<Result _={data} type={'MPH'} />
				</>
			)}
			{convertionType === CONVERTION.SPEED_TO_PACE_METRIC && (
				<>
					<PaceToSpeed
						type={CHANGE_TYPE.KMH_TO_PACE}
						value={state.kmh}
						handleChange={handleChange}
						unit={TIME_UNIT.SPEED}
					/>
					<Help str={'Enter speed in kmh'} />
					<Result _={data} type={'SPEED_METRIC'} />
				</>
			)}
			{convertionType === CONVERTION.SPEED_TO_PACE_IMPERIAL && (
				<>
					<PaceToSpeed
						type={CHANGE_TYPE.MPH_TO_PACE}
						value={state.mph}
						handleChange={handleChange}
						unit={TIME_UNIT.SPEED}
					/>
					<Help str={'Enter speed in mph'} />
					<Result _={data} type={'SPEED_IMPERIAL'} />
				</>
			)}
		</div>
	);
};

export default Converter;
