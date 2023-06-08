import styled from '@emotion/styled';
import { PaceData, Pace } from '../types';

interface ResultProps {
	data: PaceData;
	imperialData: PaceData;
	metricPace: Pace;
	imperialPace: Pace;
	kmh: number;
	mph: number;
}

const ResultMonitor = ({
	data,
	imperialData,
	metricPace,
	imperialPace,
	kmh,
	mph,
}: ResultProps) => {
	return (
		<Monitor>
			<Section>
				<Title>Metric</Title>
				<Row>
					<Span>{`Distance: ${data.distance} meters`}</Span>{' '}
					{data.raceName && <Span>{`(${data.raceName})`}</Span>}
				</Row>
				<Row>
					<Span>{`Total time: ${data.hours}:${data.minutes}:${data.seconds}`}</Span>
				</Row>
				<Row>
					{data.distance && metricPace.minutes !== Infinity ? (
						<Span>{`Pace: ${metricPace.minutes}:${metricPace.seconds} (min/km)`}</Span>
					) : null}
				</Row>
				<Row>
					{data.distance && kmh !== Infinity ? (
						<Span>{`${kmh.toFixed(2)} km/h`}</Span>
					) : null}
				</Row>
			</Section>
			<Section>
				<Title>Imperial</Title>
				<Row>
					<Span>{`Distance: ${imperialData.distance} miles`}</Span>{' '}
					{imperialData.raceName && <Span>{`(${imperialData.raceName})`}</Span>}
				</Row>
				<Row>
					<Span>{`Total time: ${imperialData.hours}:${imperialData.minutes}:${imperialData.seconds}`}</Span>
				</Row>
				<Row>
					{data.distance && imperialPace.minutes !== Infinity ? (
						<Span>{`Pace: ${imperialPace.minutes}:${imperialPace.seconds} (min/mile)`}</Span>
					) : null}
				</Row>
				<Row>
					{data.distance && mph !== Infinity ? (
						<Span>{`${mph.toFixed(2)} mp/h`}</Span>
					) : null}
				</Row>
			</Section>
		</Monitor>
	);
};

const Monitor = styled.div`
	margin: 1em 0;
	border: 1px solid rgb(0 0 0 / 4%);
	border-radius: 8px;
	overflow: hidden;
`;

const Title = styled.div`
	font-size: 1em;
`;

const Span = styled.span`
	font-size: 0.8em;
	// font-weight: 200;
`;

const Row = styled.div`
	padding: 0.2em;
`;

const Section = styled.div`
	padding: 1em;
	background: rgb(144 238 144 / 24%);
`;

export default ResultMonitor;
