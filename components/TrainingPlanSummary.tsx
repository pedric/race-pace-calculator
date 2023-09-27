import { useContext } from 'react';
import styled from '@emotion/styled';
import { TrainingplanContext } from '../context/traininplan/TrainingPlanContext';

type WeekProps = {
	periodIndex: number;
	weekIndex: number;
};

export const WeekSummary = ({ periodIndex, weekIndex }: WeekProps) => {
	const { periods } = useContext(TrainingplanContext);
	const days = periods[periodIndex].plan[weekIndex].days;
	console.log('days', days);

	return <div>sum week</div>;
};
