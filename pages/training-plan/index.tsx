import TrainingPlanner from '../../containers/TrainingPlanner/TrainingPlanner';
import { SESSION_TYPES, MEASUREMENT_TYPES } from '../../util/constants';
import { BackDrop } from '../../styles/layout';

const Page = () => {
	return (
		<BackDrop>
			<TrainingPlanner />
		</BackDrop>
	);
};

export default Page;
