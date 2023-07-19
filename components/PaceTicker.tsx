import styled from '@emotion/styled';
import Icon from './Icon';
import { MODE, UNIT } from '../util/constants';

type PaceTickerProps = {
	min: number;
	max: number;
	value: number | undefined;
	units: string;
	mode: string;
	handleChange: (a: number, b: string) => void;
};

const PaceTicker = ({
	min,
	max,
	value,
	units,
	mode,
	handleChange,
}: PaceTickerProps) => {
	return (
		<StyledPaceTicker>
			<Button
				role='button'
				onClick={() => {
					if (typeof value == 'number' && value > min) {
						handleChange(value - 1, units);
					}
				}}
			>
				<Icon icon={'minus'} size={12} />
			</Button>
			<Value
				onKeyUp={(e) => {
					if (e.key == 'ArrowUp' && typeof value == 'number' && value < max) {
						handleChange(value + 1, units);
					} else if (
						e.key == 'ArrowDown' &&
						typeof value == 'number' &&
						value > min
					) {
						handleChange(value - 1, units);
					}
				}}
			>
				<input type='number' value={value} />
			</Value>
			<Button
				role='button'
				onClick={() => {
					if (typeof value == 'number' && value < max) {
						handleChange(value + 1, units);
					}
				}}
			>
				<Icon icon={'plus'} size={12} />
			</Button>
			<StyledUnit>
				{`${units == UNIT.M ? 'Min' : 'Sec'}${
					mode === MODE.METRIC ? ' /km' : ' /mile'
				}`}
			</StyledUnit>
		</StyledPaceTicker>
	);
};

const StyledPaceTicker = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Value = styled.div`
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
`;
const Button = styled.span``;

const StyledUnit = styled.span`
	margin-left: 0.25em;
	font-size: 12px;
`;

export default PaceTicker;
