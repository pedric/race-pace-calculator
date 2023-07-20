import styled from '@emotion/styled';
import { PaceData, Pace } from '../types';
import { breakpoints, MODE } from '../util/constants';
import { theme } from '../styles/theme';
import { metersToKilometers, distanceToKilometres } from '../util/maths';

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
	const timeIsSet = data.hours || data.minutes || data.seconds;
	const isActive = data.distance && timeIsSet;

	if (!isActive) {
		return (
			<Monitor inActive={true}>
				<Section>
					<Row>
						<Span>...</Span>
					</Row>
				</Section>
			</Monitor>
		);
	}

	return (
		<>
			{/* <Racename>
				{data.raceName && <Span>{`${data.raceName}`}</Span>}
				{imperialData.raceName && imperialData.raceName !== '0.00 miles' && (
					<Span>{`${imperialData.raceName}`}</Span>
				)}
			</Racename> */}
			<Monitor>
				{/* {data.distance <= 0 && <Reminder>Please set a distance.</Reminder>} */}
				{mode == MODE.METRIC ? (
					<Section units={'metric'}>
						<Row>
							<Span>
								{data.distance
									? `${distanceToKilometres(data.distance)} km`
									: 'Unset'}
							</Span>
						</Row>
						<Row>
							<Span>{`${data.hours}h ${data.minutes}m ${data.seconds}s`}</Span>
						</Row>
						<Row>
							{data.distance && metricPace.minutes !== Infinity ? (
								<>
									<Span>{`${metricPace.minutes}:${metricPace.seconds} min/km`}</Span>
								</>
							) : (
								'...'
							)}
						</Row>
						<Row>
							{data.distance && kmh !== Infinity ? (
								<>
									<Span>{`${kmh.toFixed(2)} km/h`}</Span>
								</>
							) : (
								'...'
							)}
						</Row>
					</Section>
				) : (
					<Section units={'imperial'}>
						<Row>
							<Span>
								{imperialData.distance
									? `${imperialData.distance} miles`
									: 'Unset'}
							</Span>
						</Row>
						<Row>
							<Span>{`${imperialData.hours}:${imperialData.minutes}:${imperialData.seconds}`}</Span>
						</Row>
						<Row>
							{data.distance && imperialPace.minutes !== Infinity ? (
								<>
									<Span>{`${imperialPace.minutes}:${imperialPace.seconds} (min/mile)`}</Span>
								</>
							) : (
								'...'
							)}
						</Row>
						<Row>
							{data.distance && mph !== Infinity ? (
								<>
									<Span>{`${mph.toFixed(2)} mp/h`}</Span>
								</>
							) : (
								'...'
							)}
						</Row>
					</Section>
				)}
			</Monitor>
		</>
	);
};

const Spacer = styled.div`
	height: 1em;
`;

const Monitor = styled.div<any>`
	width: 120px;
	height: 120px;
	border: 4px solid ${({ inActive }) => (inActive ? theme.gray : theme.cta)};
	border-radius: 9999px;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	justify-content: center;
	background: ${theme.white};
	position: absolute;
	z-index: 20;
	right: 1em;
	top: -30px;
	font-size: 16px;

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
	// padding: 0.2em;
	text-align: center;
	line-height: 1;
`;

const Reminder = styled.p`
	text-align: center;
`;

const Section = styled.div<any>`
	// flex: 1 1 auto;
	// padding: 0.5;
	// background: rgb(144 238 144 / 24%);
	text-align: center;

	@media (min-width: ${breakpoints.s}px) {
		text-align: left;
	}
`;

export default ResultMonitor;
