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
		// console.log('HMS', { hours, minutes, seconds });

		setData({ ...data, hours, minutes, seconds });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	const handleChange = (value: number, unit: string) => {
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

	const pace = mode === MODE.METRIC ? state.metricPace : state.imperialPace;
	// const outputValue = MODE.METRIC ? metricPace : imperialPace;

	return (
		<StyledPaceEditor>
			<PaceTicker
				min={0}
				max={60}
				value={pace.minutes}
				handleChange={handleChange}
				units={UNIT.M}
				mode={mode}
			/>
			<PaceTicker
				min={0}
				max={60}
				value={pace.seconds}
				handleChange={handleChange}
				units={UNIT.S}
				mode={mode}
			/>
		</StyledPaceEditor>
	);
};

const StyledPaceEditor = styled.div``;
const StyledUnit = styled.span``;

export default PaceEditor;
