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
	const unitChoices: Choice[] = [
		{ name: 'km', value: MODE.METRIC },
		{ name: 'mi', value: MODE.IMPERIAL },
	];

	return (
		<Wrapper>
			<Menu>
				{unitChoices.map((_: Choice, idx: number) => (
					<Button
						role={'button'}
						active={_.value == units}
						key={idx}
						onClick={() => setUnits(_.value)}
					>
						{/* {_.value == units ? (
							<Span>
								<Icon icon={'check'} size={14} />
							</Span>
						) : null} */}
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

const Menu = styled.nav`
	display: flex;
	margin: 1em 0;
	// padding: 0.5em 0;
`;

const Button = styled.div<any>`
	appearance: none;
	border: none;
	font-size: 1em;
	background: ${({ active }) => (active ? theme.cta : theme.gray)};
	color: ${({ active }) => (active ? theme.white : theme.black)};
	display: block;
	line-height: 1.4;
	display: flex;
	align-items: center;
	padding: 0.5em 1em;
	margin-right: 1em;
	border-radius: 9999px;
	transition: 100ms linear;

	&:hover {
		// background: ${theme.white};
		// color: ${theme.cta};
		transform: scale(1.1);
		cursor: pointer;
	}
`;

export default RaceMenu;
