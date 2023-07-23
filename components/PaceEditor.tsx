import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Pace, PaceData, PaceEditorState } from '../types';
import { MODE, UNIT } from '../util/constants';
import { updateStateFromPace } from '../util/maths';
import PaceTicker from './PaceTicker';

type Props = {
	metricPace: Pace;
	imperialPace: Pace;
	mode: string;
	data: PaceData;
	setData: (value: PaceData) => void;
};

const PaceEditor = ({
	metricPace,
	imperialPace,
	mode,
	data,
	setData,
}: Props) => {
	const [state, setState] = useState<PaceEditorState>({
		metricPace: metricPace,
		imperialPace: imperialPace,
	});

	useEffect(() => {
		const { hours, minutes, seconds } = updateStateFromPace(
			state,
			mode,
			data.distance,
		);
		setData({ ...data, hours, minutes, seconds });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	const handleChange = (value: number, unit: string) => {
		if (isNaN(value)) {
			return;
		}
		const updatedUnit =
			unit == UNIT.M ? { minutes: value } : { seconds: value };
		const newStateItem =
			mode === MODE.METRIC
				? { ...state.metricPace, ...updatedUnit }
				: { ...state.imperialPace, ...updatedUnit };

		const newState = { ...state };

		if (mode === MODE.METRIC) {
			newState.metricPace = newStateItem;
		} else if (mode === MODE.IMPERIAL) {
			newState.imperialPace = newStateItem;
		}
		setState(newState);
	};

	const pace = mode === MODE.METRIC ? metricPace : imperialPace;

	const isActive = data.distance;

	return isActive ? (
		<StyledPaceEditor>
			<PaceTicker
				min={0}
				max={60}
				value={isNaN(pace.minutes) ? 0 : pace.minutes}
				handleChange={handleChange}
				units={UNIT.M}
				mode={mode}
				type={'RANGE'}
			/>
			<PaceTicker
				min={0}
				max={59}
				value={isNaN(pace.seconds) ? 0 : pace.seconds}
				handleChange={handleChange}
				units={UNIT.S}
				mode={mode}
				type={'RANGE'}
			/>
		</StyledPaceEditor>
	) : (
		<StyledMessage>Enter distance to begin</StyledMessage>
	);
};

const StyledPaceEditor = styled.div`
	display: grid;
	gap: 1em;
`;

const StyledMessage = styled.div`
	text-align: center;
`;

export default PaceEditor;
