import { theme } from '../styles/theme';
import styled from '@emotion/styled';
import { BackDrop } from '../styles/layout';
import Link from 'next/link';

const Home = () => {
	return (
		<BackDrop>
			<MenuWrapper>
				<Menu>
					<Link href={'/race-pace-calculator'}>Race calculator</Link>
					<Link href={'/training-plan'}>Training planner</Link>
					<Link href={'/pace-converter'}>Pace Converter</Link>
				</Menu>
			</MenuWrapper>
		</BackDrop>
	);
};

const MenuWrapper = styled.div`
	display: grid;
	place-items: center;
	width: 100%;
	height: 100vh;
`;

const Menu = styled.nav`
	font-family: 'inter', sans-serif;
	display: flex;
	flex-direction: column;

	@media (min-width: 768px) {
		flex-direction: row;
	}

	a {
		margin: 1em;
		color: ${theme.cta};
	}
`;
export default Home;
