import { useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '../styles/theme';
import Icon from './Icon';

type Props = {
	initiallyOpen: boolean;
	children: React.ReactNode;
	text: string;
};

const HeadLine = ({ initiallyOpen, children, text }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(initiallyOpen);

	return (
		<StyledHeadLine>
			<Title onClick={() => setIsOpen(!isOpen)}>
				<Flex>
					<h3>{text}</h3>
					<Icon icon={isOpen ? 'chevron-up' : 'chevron-down'} size={16} />
				</Flex>
				<Border />
			</Title>

			{isOpen && children}
		</StyledHeadLine>
	);
};

const StyledHeadLine = styled.div`
	margin: 0.25em 0;
	h3 {
		font-size: 16px;
		font-weight: 200;
		margin: 0 0 0.05em 0;
		flex: 1 1 auto;
	}
`;
const Border = styled.div`
	height: 1px;
	background: ${theme.cta};
`;

const Title = styled.div<any>`
	margin: 1em 0;
	color: ${theme.cta};
`;

const Flex = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;

export default HeadLine;
