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
	// const [position, setPosition] = useState<number>(0);

	// const handleBubble = (range: any) => {
	// 	const newValue = Math.floor(
	// 		Number(((range.value - range.min) * 100) / (range.max - range.min)),
	// 	);

	// 	setPosition(newValue);
	// };

	return (
		<InputWrapper>
			<Label htmlFor={id}>{label}</Label>
			{/* <Bubble position={position}>{value}</Bubble> */}
			<input
				name={id}
				type='range'
				min={min}
				max={max}
				value={value}
				onChange={(e) => {
					handleChange(mode, Number(e.target.value));
				}}
				// onInput={(e) => {
				// 	handleBubble(e.target);
				// }}
			></input>
			{/* <Span>{`${defaultValue} ${
				label && label.slice(0, 1).toLowerCase()
			}`}</Span> */}
		</InputWrapper>
	);
};

const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;

	input[type='range'] {
		appearance: none;
		border-bottom: 4px solid ${theme.gray};
		position: relative;
		margin: 0 0.5em;

		// &::before {
		// 	content: '';
		// 	position: absolute;
		// 	top: 5px;
		// 	right: 0;
		// 	left: 0;
		// 	z-index: 0;
		// 	border-bottom: 4px solid ${theme.gray};
		// }

		&::-webkit-slider-thumb {
			width: 16px;
			height: 16px;
			background: ${theme.cta};
			color: ${theme.cta};
			-webkit-appearance: none;
			z-index: 100;
			border-radius: 9999px;

			// position: relative;
			// height: 16px;
			// width: 16px;
			// background-color: transparent;
			// cursor: pointer;
			// background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItY2hldnJvbi1kb3duIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSI+PC9wb2x5bGluZT48L3N2Zz4=');
			// background-position: center;
			// background-size: cover;
		}

		&::-moz-range-thumb {
			width: 16px;
			height: 16px;
			background: ${theme.cta};
			color: ${theme.cta};
			z-index: 100;
			-webkit-appearance: none;
			border-radius: 9999px;

			// position: relative;
			// height: 16px;
			// width: 16px;
			// background-color: transparent;
			// cursor: pointer;
			// background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItY2hldnJvbi1kb3duIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSI+PC9wb2x5bGluZT48L3N2Zz4=');
			// background-position: center;
			// background-size: cover;
		}
	}
`;

const Label = styled.label`
	text-align: center;
	font-size: 12px;
	font-weight: 200;
	color: ${theme.black};
`;

// const Span = styled.label`
// 	text-align: center;
// `;

// const Bubble = styled.div<any>`
// 	background: ${theme.strong};
// 	color: ${theme.white};
// 	display: inline-block;
// 	width: fit-content;
// 	padding: 2px 4px;
// 	position: absolute;
// 	top: 0;
// 	left: ${({ position }) => `${position}%`};
// 	transform: translateX(-105%);
// 	border-radius: 4px;
// 	overflow: hidden;
// `;

export default TimeRange;
