import { theme } from '../styles/theme';
import styled from '@emotion/styled';
import RacePaceCalculator from '../containers/RacePaceCalculator';

const Home = () => {
	return (
		<BackDrop>
			<RacePaceCalculator />
		</BackDrop>
	);
};

const BackDrop = styled.main`
	background: rgba(0, 0, 0, 0.08);
	min-height: 100vh;
	min-width: 100vw;
	display: flex;
	justify-content: center;
	align-items: flex-start;
`;

export default Home;
