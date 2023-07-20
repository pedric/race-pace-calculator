import styled from '@emotion/styled';
// import FeatherIcon from 'feather-icons-react';
import Icon from './Icon';
import { theme } from '../styles/theme';

type Props = {
	timeTick?: any;
	unit: string;
	value: number;
	defaultValue?: number;
	handleChange?: any;
};

const TimeTicker = ({
	timeTick,
	unit,
	value,
	defaultValue,
	handleChange,
}: Props) => {
	const icon = value == -1 ? 'minus' : 'plus';
	return (
		<TickButton
			onClick={() =>
				timeTick
					? timeTick(unit, value)
					: handleChange(defaultValue, value, unit)
			}
		>
			<Icon icon={icon} size={16} />
		</TickButton>
	);
};

const TickButton = styled.button`
	position: relative;
	appearance: none;
	border: none;
	background: ${theme.gray};
	color: ${theme.black};
	text-align: center;
	width: 32px;
	height: 32px;
	margin: 0;
	border-radius: 9999px;

	&:hover {
		cursor: pointer;
	}

	svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

export default TimeTicker;
