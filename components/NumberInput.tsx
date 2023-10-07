import styled from '@emotion/styled';
import { theme } from '../styles/theme';
import Icon from './Icon';

type Data = {
	periodIndex: number;
	weekIndex: number;
	dayIndex: number;
	sessionIndex: number;
	splitIndex: number;
};

type Props = {
	value: number;
	data: Data;
	label: string;
	onChangeFunction: (value: string | number, periodIndex: number, weekIndex: number, dayIndex: number, sessionIndex: number, splitIndex: number) => void;
};

export default function NumberInput({ value, data, label, onChangeFunction }: Props) {
	const { periodIndex, weekIndex, dayIndex, sessionIndex, splitIndex } = data;
	const loacalChangeHandler = (value: number | string) => {
		const val = Number(value);
		if (typeof value != 'number') return;
		if (val >= 0) {
			onChangeFunction(val, periodIndex, weekIndex, dayIndex, sessionIndex, splitIndex);
		}
	};
	return (
		<StyledInput>
			<ButtonSet>
				<Button role='button' $disabled={value < 10} onClick={() => loacalChangeHandler(value - 10)}>
					-10
				</Button>
				<Button role='button' $disabled={value <= 0} onClick={() => loacalChangeHandler(value - 1)}>
					-1
				</Button>
			</ButtonSet>
			<Value>
				{value} <Label>{label}</Label>
			</Value>
			<ButtonSet>
				<Button role='button' onClick={() => loacalChangeHandler(value + 1)}>
					+1
				</Button>
				<Button role='button' onClick={() => loacalChangeHandler(value + 10)}>
					+10
				</Button>
			</ButtonSet>
		</StyledInput>
	);
}

const StyledInput = styled.div`
	margin: 0.5em;
	padding: 0.5em;
	display: flex;
	align-items: center;
	justify-content: space-around;
`;

type ButtonProps = {
	$disabled?: boolean;
};

const Value = styled.div`
	font-size: 1.25em;
`;
const Label = styled.span``;

const ButtonSet = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 0.5em;
`;

const Button = styled.div<ButtonProps>`
	opacity: ${({ $disabled }) => ($disabled ? '0.75' : '1')};
	color: ${theme.white};
	background: ${theme.cta};
	padding: 0.5em;
	border-radius: 9999px;
	display: grid;
	place-items: center;
	height: 40px;
	width: 40px;
	transition: transform 150ms linear;

	&:hover {
		cursor: pointer;
		transform: ${({ $disabled }) => ($disabled ? 'none' : 'scale(1.1)')};
	}
`;
