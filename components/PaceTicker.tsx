import styled from '@emotion/styled';
import Icon from './Icon';
import { MODE, UNIT } from '../util/constants';
import { theme } from '../styles/theme';
import TimeTicker from './TimeTicker';

type PaceTickerProps = {
	min: number;
	max: number;
	value: number;
	units: string;
	mode: string;
	type: string;
	handleChange: (a: number, b: string) => void;
};

const PaceTicker = ({
	min,
	max,
	value,
	units,
	mode,
	type,
	handleChange,
}: PaceTickerProps) => {
	const controlledChangeHandler = (
		value: number,
		dir: number,
		unit: string,
	) => {
		if (typeof value == 'number') {
			const controlledValue = value + dir;
			if (controlledValue < min || controlledValue > max) {
				return;
			}
			handleChange(controlledValue, unit);
		}
	};

	return (
		<StyledPaceTicker>
			<StyledUnit>
				{`${isNaN(value) ? 0 : value}${units == UNIT.M ? 'min' : 'sec'}${
					mode === MODE.METRIC ? ' /km' : ' /mile'
				}`}
			</StyledUnit>
			<Control>
				<TimeTicker
					unit={units}
					timeTick={null}
					handleChange={controlledChangeHandler}
					value={-1}
					defaultValue={isNaN(value) ? 0 : value}
				/>
				<Value>
					{type == 'NUMBER' && (
						<input
							type='number'
							value={!isNaN(value) ? value : 0}
							onChange={(e) => {
								if (
									typeof value == 'number' &&
									Number(e.target.value) > value &&
									Number(e.target.value) < max
								) {
									handleChange(Number(e.target.value) + 1, units);
								} else if (
									typeof value == 'number' &&
									Number(e.target.value) < value &&
									Number(e.target.value) > min
								) {
									handleChange(value - 1, units);
								}
							}}
						/>
					)}
					{type == 'RANGE' && (
						<input
							type='range'
							min={min}
							max={max}
							value={!isNaN(value) ? value : 0}
							onChange={(e) => {
								if (
									typeof value == 'number' &&
									Number(e.target.value) > value &&
									Number(e.target.value) < max
								) {
									handleChange(Number(e.target.value) + 1, units);
								} else if (
									typeof value == 'number' &&
									Number(e.target.value) < value &&
									Number(e.target.value) > min
								) {
									handleChange(value - 1, units);
								}
							}}
						/>
					)}
				</Value>
				<TimeTicker
					unit={units}
					timeTick={null}
					handleChange={controlledChangeHandler}
					value={1}
					defaultValue={isNaN(value) ? 0 : value}
				/>
			</Control>
		</StyledPaceTicker>
	);
};

const StyledPaceTicker = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	// margin: 1em 0;
`;

const Control = styled.div`
	// display: flex;
	// align-items: center;
	display: grid;
	grid-template-columns: 1fr 8fr 1fr;
	width: calc(100% - 86px);
`;

const Value = styled.div`
	width: 100%;
	//number
	input[type='number'] {
		appearance: textField;
		border: 0;
		width: 30px;
		text-align: center;

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
	}

	// range
	input[type='range'] {
		width: calc(100% - 1em);
		appearance: none;
		// border-bottom: 4px solid ${theme.gray};
		position: relative;
		margin: 0 0.5em;

		&::before {
			content: '';
			position: absolute;
			// top: 5px;
			bottom: -4px;
			right: 0;
			left: 0;
			z-index: 0;
			border-bottom: 4px solid ${theme.gray};
		}

		&::-webkit-slider-thumb {
			width: 16px;
			height: 16px;
			background: ${theme.cta};
			color: ${theme.cta};
			-webkit-appearance: none;
			z-index: 100;
			border-radius: 9999px;
		}

		&::-moz-range-thumb {
			width: 16px;
			height: 16px;
			background: ${theme.cta};
			color: ${theme.cta};
			z-index: 100;
			-webkit-appearance: none;
			border-radius: 9999px;
		}
	}
`;
const Button = styled.span``;

const StyledUnit = styled.span`
	// margin-left: 0.25em;
	font-size: 14px;
	width: 70px;
`;

export default PaceTicker;
