import styled from '@emotion/styled';
import { theme } from '../styles/theme';

type MenuProps = {
	inputChoice: string;
	setInputChoice: (value: string) => void;
	units: string;
	mode?: string;
	setUnits: (value: string) => void;
};

type Choice = {
	name: string;
	value: string;
};

const RaceMenu = ({
	inputChoice,
	setInputChoice,
	units,
	setUnits,
	mode,
}: MenuProps) => {
	const inputchoices: Choice[] = [
		{ name: 'Select race', value: 'select' },
		{ name: 'Custom distance', value: 'free' },
	];

	const unitChoices: Choice[] = [
		{ name: 'Metric', value: 'metric' },
		{ name: 'Imperial', value: 'imperial' },
	];

	return (
		<Menu mode={mode}>
			{inputchoices.map((_, idx) => (
				<Button
					className={_.value == inputChoice ? 'active' : ''}
					key={idx}
					onClick={() => setInputChoice(_.value)}
				>
					{_.name}
				</Button>
			))}

			{unitChoices.map((_, idx) => (
				<Button
					className={_.value == units ? 'active' : ''}
					key={idx}
					onClick={() => setUnits(_.value)}
				>
					{_.name}
				</Button>
			))}
		</Menu>
	);
};

const Menu = styled.nav<any>`
	position: ${({ mode }) => (mode ?? mode == 'block' ? 'block' : 'fixed')};
	margin: ${({ mode }) => (mode ?? mode == 'block' ? '1em auto' : '0')};
	right: 0;
	bottom: 0;
	left: 0;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	background: ${theme.strong};
	border-top: 1px solid ${theme.gray};
	border-bottom: ${({ mode }) =>
		mode ?? mode == 'block' ? `1px solid ${theme.gray}` : 'none'};
	// padding: 4px;
	min-height: 50px;

	@media (min-width: ${theme.breakpoints.m}px) {
		min-height: 60px;
	}
`;

const Button = styled.button`
	appearance: none;
	border: none;
	background: transparent;
	text-align: center;
	text-transform: uppercase;
	font-size: 0.7em;
	color: ${theme.white};

	&.active {
		background: ${theme.white};
		color: ${theme.strong};
		text-decoration: underline;
		border-right: 1px solid ${theme.gray};
		border-left: 1px solid ${theme.gray};
	}

	&:hover {
		background: ${theme.white};
		color: ${theme.strong};
		cursor: pointer;
	}
`;

export default RaceMenu;
