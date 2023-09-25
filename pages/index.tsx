import { theme } from '../styles/theme';
import styled from '@emotion/styled';
import { BackDrop } from '../styles/layout';
import Link from 'next/link';

const Home = () => {
	return (
		<BackDrop>
			<Menu>
				<Link href={'/race-pace-calculator'}>Race calculator</Link>
				<Link href={'/training-plan'}>training plan</Link>
				<Link href={'/pace-converter'}>pace-converter</Link>
			</Menu>
		</BackDrop>
	);
};

const Menu = styled.nav`
	font-family: 'inter', sans-serif;

	a {
		margin: 1em;
	}
`;
export default Home;
