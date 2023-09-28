import styled from '@emotion/styled';
import RacePaceCalculator from '../../containers/RacePaceCalculator/RacePaceCalculator';
import { BackDrop } from '../../styles/layout';

const Home = () => {
	return (
		<BackDrop>
			<RacePaceCalculator />
		</BackDrop>
	);
};

export default Home;
