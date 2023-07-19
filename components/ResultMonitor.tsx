import styled from '@emotion/styled';
import { PaceData, Pace } from '../types';
import { breakpoints, MODE } from '../util/constants';
import { theme } from '../styles/theme';
// import {
// 	paceInKmFromStateData,
// 	paceInmilesFromStateData,
// 	metersToMilesToCalcMilePce,
// 	metersToMiles,
// 	milesToMeters,
// 	kilometerPerHourPace,
// 	milesPerHourPace,
// } from '../util/maths';

interface ResultProps {
	data: PaceData;
	imperialData: PaceData;
	metricPace: Pace;
	imperialPace: Pace;
	kmh: number;
	mph: number;
	mode: string;
}

const ResultMonitor = ({
	data,
	imperialData,
	metricPace,
	imperialPace,
	kmh,
	mph,
	mode,
}: ResultProps) => {
	return (
		<>
			<Spacer />
			<Racename>
				{data.raceName && <Span>{`${data.raceName}`}</Span>}
				{imperialData.raceName && imperialData.raceName !== '0.00 miles' && (
					<Span>{`${imperialData.raceName}`}</Span>
				)}
			</Racename>
			<Monitor>
				{/* {data.distance <= 0 && <Reminder>Please set a distance.</Reminder>} */}
				<Section units={'metric'}>
					<Title>Metric</Title>
					<Row>
						<SubTitle>Distance</SubTitle>
						<Span>{data.distance ? `${data.distance} meters` : 'Unset'}</Span>
					</Row>
					<Row>
						<SubTitle>Total time</SubTitle>
						<Span>{`${data.hours}:${data.minutes}:${data.seconds}`}</Span>
					</Row>
					<Row>
						<SubTitle>Pace</SubTitle>
						{data.distance && metricPace.minutes !== Infinity ? (
							<>
								<Span>{`${metricPace.minutes}:${metricPace.seconds} (min/km)`}</Span>
							</>
						) : (
							'...'
						)}
					</Row>
					<Row>
						<SubTitle>Speed</SubTitle>
						{data.distance && kmh !== Infinity ? (
							<>
								<Span>{`${kmh.toFixed(2)} km/h`}</Span>
							</>
						) : (
							'...'
						)}
					</Row>
				</Section>
				<Section units={'imperial'}>
					<Title>Imperial</Title>
					<Row>
						<SubTitle>Distance</SubTitle>
						<Span>
							{imperialData.distance
								? `${imperialData.distance} miles`
								: 'Unset'}
						</Span>
					</Row>
					<Row>
						<SubTitle>Total time</SubTitle>
						<Span>{`${imperialData.hours}:${imperialData.minutes}:${imperialData.seconds}`}</Span>
					</Row>
					<Row>
						<SubTitle>Pace</SubTitle>
						{data.distance && imperialPace.minutes !== Infinity ? (
							<>
								<Span>{`${imperialPace.minutes}:${imperialPace.seconds} (min/mile)`}</Span>
							</>
						) : (
							'...'
						)}
					</Row>
					<Row>
						<SubTitle>Speed</SubTitle>
						{data.distance && mph !== Infinity ? (
							<>
								{/* <SubTitle>Speed</SubTitle> */}
								<Span>{`${mph.toFixed(2)} mp/h`}</Span>
							</>
						) : (
							'...'
						)}
					</Row>
				</Section>
			</Monitor>
			<Spacer />
		</>
	);
};

const Spacer = styled.div`
	height: 1em;
`;

const Monitor = styled.div<any>`
	width: 100%;
	// margin: 1em 0;
	border: 1px solid rgb(0 0 0 / 4%);
	border-radius: 2px;
	overflow: hidden;
	display: flex;
	flex-direction: row;
	background: ${theme.accent};

	// @media (min-width: ${breakpoints.s}px) {
	// 	flex-direction: column;
	// }
`;

const Racename = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 0 0.5em 0.5em 0;
`;

const Title = styled.div`
	font-size: 0.8em;
	font-weight: 200;
	text-transform: uppercase;
	margin-bottom: 0.25em;
`;

const Span = styled.span`
	font-size: 0.8em;
	// font-weight: 200;
`;

const SubTitle = styled.span`
	display: block;
	font-size: 0.6em;
	font-weight: 200;
	text-transform: uppercase;
`;

const Row = styled.div`
	padding: 0.2em;
`;

const Reminder = styled.p`
	text-align: center;
`;

const Section = styled.div<any>`
	flex: 1 1 auto;
	padding: 1em;
	// background: rgb(144 238 144 / 24%);
	text-align: ${({ units }) => (units == 'imperial' ? 'right' : 'left')};

	@media (min-width: ${breakpoints.s}px) {
		text-align: left;
	}
`;

export default ResultMonitor;
