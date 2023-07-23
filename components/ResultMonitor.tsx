import styled from '@emotion/styled';
import { PaceData, Pace } from '../types';
import { breakpoints, MODE, MONITOR } from '../util/constants';
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
	style: number;
}

const ResultMonitor = ({
	data,
	imperialData,
	metricPace,
	imperialPace,
	kmh,
	mph,
	mode,
	style,
}: ResultProps) => {
	const timeIsSet = data.hours || data.minutes || data.seconds;
	const isActive = data.distance && timeIsSet;

	if (!isActive) {
		return style === MONITOR.BUBBLE ? (
			<Monitor inActive={true}>
				<Section>
					<Row>
						<Span>...</Span>
					</Row>
				</Section>
			</Monitor>
		) : (
			<Box isLoading={true}></Box>
		);
	}

	return style === MONITOR.BUBBLE ? (
		<Monitor>
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
							{imperialData.distance ? `${imperialData.distance} mi` : 'Unset'}
						</Span>
					</Row>
					<Row>
						<Span>{`${imperialData.hours}h ${imperialData.minutes}m ${imperialData.seconds}s`}</Span>
					</Row>
					<Row>
						{data.distance && imperialPace.minutes !== Infinity ? (
							<>
								<Span>{`${imperialPace.minutes}:${imperialPace.seconds} min/mile`}</Span>
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
	) : (
		<Box>
			<InnerBox>
				{mode == MODE.METRIC ? (
					<Section units={'metric'}>
						<Row>
							<Span large={true}>
								{data.distance
									? `${distanceToKilometres(data.distance)} km`
									: 'Unset'}
							</Span>
						</Row>
						<Row>
							<Span
								large={true}
							>{`${data.hours}h ${data.minutes}m ${data.seconds}s`}</Span>
						</Row>
						<Row>
							{data.distance && metricPace.minutes !== Infinity ? (
								<>
									<Span
										large={true}
									>{`${metricPace.minutes}:${metricPace.seconds} min/km`}</Span>
								</>
							) : (
								'...'
							)}
						</Row>
						<Row>
							{data.distance && kmh !== Infinity ? (
								<>
									<Span large={true}>{`${kmh.toFixed(2)} km/h`}</Span>
								</>
							) : (
								'...'
							)}
						</Row>
					</Section>
				) : (
					<Section units={'imperial'}>
						<Row>
							<Span large={true}>
								{imperialData.distance
									? `${imperialData.distance} mi`
									: 'Unset'}
							</Span>
						</Row>
						<Row>
							<Span
								large={true}
							>{`${imperialData.hours}h ${imperialData.minutes}m ${imperialData.seconds}s`}</Span>
						</Row>
						<Row>
							{data.distance && imperialPace.minutes !== Infinity ? (
								<>
									<Span
										large={true}
									>{`${imperialPace.minutes}:${imperialPace.seconds} min/mi`}</Span>
								</>
							) : (
								'...'
							)}
						</Row>
						<Row>
							{data.distance && mph !== Infinity ? (
								<>
									<Span large={true}>{`${mph.toFixed(2)} mp/h`}</Span>
								</>
							) : (
								'...'
							)}
						</Row>
					</Section>
				)}
			</InnerBox>
		</Box>
	);
};

const Box = styled.div<any>`
	@keyframes pulse {
		0% {
			background: ${theme.gray};
		}
		50% {
			background: ${theme.white};
		}
		100% {
			background: ${theme.gray};
		}
	}

	background: ${theme.black};
	color: ${theme.white};
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	min-height: 100px;
	margin-top: -1em;
	margin-right: -1em;
	margin-left: -1em;
	margin-bottom: 0.5em;

	animation: ${({ isLoading }) =>
		isLoading == true ? 'pulse 3s ease-in-out infinite' : 'none'};
	opacity: ${({ isLoading }) => (isLoading == true ? '0.5' : '1')};
`;

const InnerBox = styled.div`
	padding: 1em;
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
`;

const Span = styled.span<any>`
	font-size: ${({ large }) => (large ? '1em' : '0.8em')};
	${({ large }) => (large ? 'line-height:1.2;' : '')}
`;

const Row = styled.div`
	// padding: 0.2em;
	text-align: center;
	line-height: 1;
`;

const Section = styled.div<any>`
	text-align: center;

	@media (min-width: ${breakpoints.s}px) {
		text-align: left;
	}
`;

export default ResultMonitor;
