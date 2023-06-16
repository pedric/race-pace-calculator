import { theme } from '../styles/theme';
import styled from '@emotion/styled';
import RacePaceCalculator from '../containers/RacePaceCalculator';

const Home = () => {
	return (
		<BackDrop>
			<Wrapper>
				<RacePaceCalculator />
			</Wrapper>
		</BackDrop>
	);
};

const BackDrop = styled.main`
	background: ${theme.white};
	min-height: 100vh;
	min-width: 100vw;
	overflow: hidden;
`;

const Wrapper = styled.div`
	margin: 0 auto;
	max-width: 1200px;
`;

export default Home;
