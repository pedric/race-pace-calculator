import styled from '@emotion/styled';
import { theme } from '../styles/theme';

interface Props {
	weekStartMonday: boolean;
	handleWeekStart: (val: boolean) => void;
}

const TrainingPlannerMenu = ({ weekStartMonday, handleWeekStart }: Props) => {
	return (
		<Menu>
			<WeekdayButton
				role='button'
				onClick={() => handleWeekStart(true)}
				active={weekStartMonday}
			>
				Week starts with monday
			</WeekdayButton>
			<WeekdayButton
				role='button'
				onClick={() => handleWeekStart(false)}
				active={!weekStartMonday}
			>
				Week starts with sunday
			</WeekdayButton>
		</Menu>
	);
};

const Menu = styled.nav`
	display: grid;
	grid-template-columns: 1fr;
	gap: 1em;
	margin: 1em auto;

	@media (min-width: ${theme.breakpoints.m}px) {
		grid-template-columns: 1fr 1fr;
	}
`;

const WeekdayButton = styled.span<any>`
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

export default TrainingPlannerMenu;
