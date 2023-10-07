import { useContext } from 'react';
import styled from '@emotion/styled';
import { TrainingplanContext } from '../context/traininplan/TrainingPlanContext';
import { TypeDay, TypeSession, TypeSessionSplit } from '../types';
import { theme } from '../styles/theme';

type WeekProps = {
	periodIndex: number;
	weekIndex: number;
};

export const WeekSummary = ({ periodIndex, weekIndex }: WeekProps) => {
	const { periods } = useContext(TrainingplanContext);
	const days = [...periods[periodIndex].plan[weekIndex].days];
	let training: TypeSessionSplit[] = [];
	days &&
		days.forEach((day: TypeDay) => {
			if (day.sessions) {
				day.sessions.forEach((session) => {
					if (session.splits) {
						session.splits.forEach((split) => {
							training.push(split);
						});
					}
				});
			}
		});
	// console.log('training', training);
	const km = training.filter((split) => split.unit == 'Km').reduce((a, b) => a + b.distance, 0);
	const miles = training.filter((split) => split.unit == 'Miles').reduce((a, b) => a + b.distance, 0);
	const minutes = training.filter((split) => split.unit == 'Minutes').reduce((a, b) => a + b.minutes, 0);

	const hasVolume = km > 0 || miles > 0 || minutes > 0;

	return hasVolume ? (
		<Container>
			<Title>Week total</Title>
			{km > 0 && <Total>{km} Km</Total>}
			{miles > 0 && <Total>{miles} Miles</Total>}
			{minutes > 0 && <Total>{minutes} Minutes</Total>}
		</Container>
	) : null;
};

type SessionProps = {
	periodIndex: number;
	weekIndex: number;
	dayIndex: number;
	sessionIndex: number;
};

export const SessionSummary = ({ periodIndex, weekIndex, dayIndex, sessionIndex }: SessionProps) => {
	const { periods } = useContext(TrainingplanContext);
	const splits = [...periods[periodIndex].plan[weekIndex].days[dayIndex].sessions[sessionIndex].splits];

	let training: TypeSessionSplit[] = [];
	if (splits) {
		splits.forEach((split) => {
			training.push(split);
		});
	}

	const km = training.filter((split) => split.unit == 'Km').reduce((a, b) => a + b.distance, 0);
	const miles = training.filter((split) => split.unit == 'Miles').reduce((a, b) => a + b.distance, 0);
	const minutes = training.filter((split) => split.unit == 'Minutes').reduce((a, b) => a + b.minutes, 0);

	const hasVolume = km > 0 || miles > 0 || minutes > 0;

	return hasVolume ? (
		<Container>
			<Title>Session total</Title>
			{km > 0 && <Total>{km} Km</Total>}
			{miles > 0 && <Total>{miles} Miles</Total>}
			{minutes > 0 && <Total>{minutes} Minutes</Total>}
		</Container>
	) : null;
};

type DayProps = {
	periodIndex: number;
	weekIndex: number;
	dayIndex: number;
};
export const DaySummary = ({ periodIndex, weekIndex, dayIndex }: DayProps) => {
	const { periods } = useContext(TrainingplanContext);
	const sessions = [...periods[periodIndex].plan[weekIndex].days[dayIndex].sessions];

	let training: TypeSessionSplit[] = [];
	sessions &&
		sessions.forEach((session: TypeSession) => {
			if (session.splits) {
				session.splits.forEach((split) => {
					training.push(split);
				});
			}
		});

	const km = training.filter((split) => split.unit == 'Km').reduce((a, b) => a + b.distance, 0);
	const miles = training.filter((split) => split.unit == 'Miles').reduce((a, b) => a + b.distance, 0);
	const minutes = training.filter((split) => split.unit == 'Minutes').reduce((a, b) => a + b.minutes, 0);

	const hasVolume = km > 0 || miles > 0 || minutes > 0;

	return hasVolume ? (
		<Container>
			<Title>Day total</Title>
			{km > 0 && <Total>{km} Km</Total>}
			{miles > 0 && <Total>{miles} Miles</Total>}
			{minutes > 0 && <Total>{minutes} Minutes</Total>}
		</Container>
	) : null;
};

const Container = styled.div`
	border-top: 1px solid ${theme.gray};
	padding: 0.5em;
`;

const Title = styled.div`
	color: ${theme.cta};
	line-height: 1.5em;
	font-size: 0.8em;
	text-transform: uppercase;
`;

const Total = styled.div`
	color: ${theme.cta};
	line-height: 1.5em;
	font-size: 0.8em;
`;
