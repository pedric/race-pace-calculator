import styled from '@emotion/styled';
import FeatherIcon from 'feather-icons-react';
import { theme } from '../styles/theme';

const TimeTicker = ({ timeTick, unit, value }) => {
	const icon = value == -1 ? 'minus' : 'plus';
	return (
		<TickButton onClick={() => timeTick(unit, value)}>
			<FeatherIcon icon={icon} size={24} />
		</TickButton>
	);
};

const TickButton = styled.button`
	position: relative;
	appearance: none;
	border: none;
	background: ${theme.strong};
	color: ${theme.white};
	text-align: center;
	width: 30px;
	height: 30px;
	margin: 0 auto;
	border-radius: 9999px;
	margin-top: 20px;

	@media (min-width: ${theme.breakpoints.s}px) {
		width: 50px;
		height: 50px;
		margin: 0 auto;
		border-radius: 9999px;
		margin-top: 9px;
	}

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
