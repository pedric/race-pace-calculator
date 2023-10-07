import { useState } from 'react';
import styled from '@emotion/styled';
import Icon from './Icon';
import { theme } from '../styles/theme';

type Data = {
	periodIndex: number;
	weekIndex: number;
	dayIndex: number;
	sessionIndex: number;
	splitIndex: number;
};

type Props = {
	options: string[];
	handleSelect: (value: string, periodIndex: number, weekIndex: number, dayIndex: number, sessionIndex: number, splitIndex: number) => void;
	data: Data;
	selectedOption: string;
};
export default function Select({ options, data, selectedOption, handleSelect }: Props) {
	const [open, setOpen] = useState<boolean>(false);
	const { periodIndex, weekIndex, dayIndex, sessionIndex, splitIndex } = data;

	return (
		<>
			<StyledSelect $open={open} onClick={() => setOpen(!open)}>
				<span>{selectedOption}</span>
				<Icon icon={open ? 'chevron-up' : 'chevron-down'} />
			</StyledSelect>
			<Options $open={open}>
				{open &&
					options &&
					options.map((option: string, idx) => (
						<Option
							key={idx}
							onClick={() => {
								handleSelect(option, periodIndex, weekIndex, dayIndex, sessionIndex, splitIndex);
								setOpen(!open);
							}}
						>
							{option}
						</Option>
					))}
			</Options>
		</>
	);
}

type StyleProps = {
	$open: boolean;
};
const StyledSelect = styled.div<StyleProps>`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: calc(100% - 1em);
	padding: 0.25em 0.5em;
	border: 1px solid ${theme.gray};
	border-radius: 2px;
	margin: 0.5em;
	margin-bottom: ${({ $open }) => ($open ? '0' : '0.5em')};
`;

const Options = styled.div<StyleProps>`
	width: calc(100% - 1em);
	padding: 0.25em 0.5em;
	padding: 0;
	border-radius: 2px;
	margin: 0 0.5em 0.5em 0.5em;
	border: ${({ $open }) => ($open ? `1px solid ${theme.gray}` : 'none')};
`;

const Option = styled.div`
	padding: 0.5em;
	&:hover {
		background: ${theme.gray};
		cursor: pointer;
	}
`;
