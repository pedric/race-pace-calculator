import styled from '@emotion/styled';
import { theme } from '../styles/theme';
import { MODE, INPUT } from '../util/constants';
import { useState } from 'react';
import Icon from './Icon';

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
	const [open, setOpen] = useState(true);
	// const inputchoices: Choice[] = [
	// 	{ name: 'Classic distance', value: INPUT.SELECT },
	// 	{ name: 'Custom distance', value: INPUT.FREE },
	// ];

	const unitChoices: Choice[] = [
		{ name: 'Metric', value: MODE.METRIC },
		{ name: 'Imperial', value: MODE.IMPERIAL },
	];

	return (
		<Wrapper>
			{/* <ToggleButton role='button' onClick={() => setOpen(!open)}>
				<Icon icon={'settings'} size={20} />
			</ToggleButton> */}

			<Menu mode={mode} open={open}>
				{/* <Title>Input mode</Title> */}
				{/* {inputchoices.map((_, idx) => (
					<Button
						role={'button'}
						className={_.value == inputChoice ? 'active' : ''}
						key={idx}
						onClick={() => setInputChoice(_.value)}
					>
						{_.value == inputChoice ? (
							<Span>
								<Icon icon={'check'} size={16} />
							</Span>
						) : null}
						{_.name}
					</Button>
				))} */}

				{/* <Title>Unit mode</Title> */}
				{unitChoices.map((_, idx) => (
					<Button
						role={'button'}
						className={_.value == units ? 'active' : ''}
						key={idx}
						onClick={() => setUnits(_.value)}
					>
						{_.value == units ? (
							<Span>
								<Icon icon={'check'} size={14} />
							</Span>
						) : null}
						{_.name}
					</Button>
				))}
			</Menu>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: relative;
	display: flex;
	margin: 0.25em 0;
`;

const Title = styled.h3`
	margin-top: 0.2em;
	margin-bottom: 0.2em;
	font-size: 1em;
`;

const ToggleButton = styled.span`
	display: grid;
	place-items: center;
`;

const Span = styled.span`
	margin: 0 0.2em 0 0;
	display: inline-flex;
	align-items: center;
`;

const Menu = styled.nav<any>`
	display: ${({ open }) => (open ? 'flex' : 'none')};
	// position: absolute;
	margin: ${({ mode }) => (mode ?? mode == 'block' ? '1em auto' : '0')};
	padding: 0.5em;
	top: 30px;
	left: 0;
	// border: 1px solid ${theme.gray};
	// background: ${theme.white};
	z-index: 3;
	// min-height: 50px;

	// @media (min-width: ${theme.breakpoints.m}px) {
	// 	min-height: 60px;
	// }
`;

const Button = styled.div`
	appearance: none;
	border: none;
	// text-align: center;
	text-transform: uppercase;
	font-size: 0.7em;
	background: ${theme.accent};
	color: ${theme.complementary};
	display: block;
	line-height: 1.4;
	display: flex;
	align-items: center;
	padding: 0.25em 1em;
	margin: 0 0.5em;
	border-radius: 9999px;

	&.active {
		background: ${theme.strong};
		color: ${theme.white};
		// text-decoration: underline;
		// border-right: 1px solid ${theme.gray};
		// border-left: 1px solid ${theme.gray};
	}

	&:hover {
		background: ${theme.white};
		color: ${theme.strong};
		cursor: pointer;
	}
`;

export default RaceMenu;
