import TrainingPlanner from '../../containers/TrainingPlanner/TrainingPlanner';
import { SESSION_TYPES, MEASUREMENT_TYPES } from '../../util/constants';
import { BackDrop } from '../../styles/layout';
import DragContext from '../../context/traininplan/DragContext';

const Page = () => {
	return (
		<BackDrop>
			<DragContext>
				<TrainingPlanner />
			</DragContext>
		</BackDrop>
	);
};

export default Page;
