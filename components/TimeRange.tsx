import styled from '@emotion/styled';
import { useId, useState } from 'react';

interface TimeRangeProps {
	min: number;
	max: number;
	defaultValue: number;
	mode: string;
	label: string;
	handleChange: (type: string, value: number) => void;
}
const TimeRange = ({
	min,
	max,
	defaultValue,
	handleChange,
	mode,
	label,
}: TimeRangeProps) => {
	const id = useId();
	// const [change, setChange] = useState<number>(0);

	// const debounceValueChange = (mode: string, value: number, timeout = 1000) => {
	// 	let newValue = change + value;
	// 	setChange(newValue);
	// 	let timer;
	// 	clearTimeout(timer);
	// 	timer = setTimeout(() => {
	// 		console.log('new val' + change);
	// 		handleChange(mode, change);
	// 		setChange(0);
	// 	}, timeout);

	// 	// handleChange(mode, Number(e.target.value));
	// };

	return (
		<InputWrapper>
			<Label htmlFor={id}>{label}</Label>
			<input
				name={id}
				type='range'
				min={min}
				max={max}
				defaultValue={defaultValue}
				onChange={(e) => {
					// debounceValueChange(mode, Number(e.target.value));
					handleChange(mode, Number(e.target.value));
				}}
			></input>
			<Span>{defaultValue}</Span>
		</InputWrapper>
	);
};

const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const Label = styled.label`
	text-align: center;
`;

const Span = styled.label`
	text-align: center;
`;

export default TimeRange;
