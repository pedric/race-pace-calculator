import styled from '@emotion/styled';
import { useId, useState } from 'react';
import { theme } from '../styles/theme';

interface TimeRangeProps {
	min: number;
	max: number;
	defaultValue: number;
	mode: string;
	label: string;
	handleChange: (type: string, value: number) => void;
	value: number;
}
const TimeRange = ({
	min,
	max,
	defaultValue,
	handleChange,
	mode,
	label,
	value,
}: TimeRangeProps) => {
	const id = useId();
	return (
		<InputWrapper>
			<Label htmlFor={id}>{label}</Label>
			<input
				name={id}
				type='range'
				min={min}
				max={max}
				value={value}
				// defaultValue={defaultValue}
				onChange={(e) => {
					// debounceValueChange(mode, Number(e.target.value));
					handleChange(mode, Number(e.target.value));
				}}
			></input>
			<Span>{`${defaultValue} ${
				label && label.slice(0, 1).toLowerCase()
			}`}</Span>
		</InputWrapper>
	);
};

const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;

	// input[type='range'] {
	// 	appearance: none;
	// 	border-bottom: 1px solid ${theme.black};

	// 	&::-webkit-slider-thumb {
	// 		position: relative;
	// 		-webkit-appearance: none;
	// 		height: 16px;
	// 		width: 16px;
	// 		background-color: transparent;
	// 		cursor: pointer;
	// 		background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItY2hldnJvbi1kb3duIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSI+PC9wb2x5bGluZT48L3N2Zz4=');
	// 		background-position: center;
	// 		background-size: cover;
	// 	}

	// 	&::-moz-range-thumb {
	// 		position: relative;
	// 		-webkit-appearance: none;
	// 		height: 16px;
	// 		width: 16px;
	// 		background-color: transparent;
	// 		cursor: pointer;
	// 		background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItY2hldnJvbi1kb3duIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSI+PC9wb2x5bGluZT48L3N2Zz4=');
	// 		background-position: center;
	// 		background-size: cover;
	// 	}
	// }
`;

const Label = styled.label`
	text-align: center;
`;

const Span = styled.label`
	text-align: center;
`;

export default TimeRange;
