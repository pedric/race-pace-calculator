import styled from '@emotion/styled';
import { PaceData, Pace } from '../types';
import { breakpoints, MODE } from '../util/constants';
import { theme } from '../styles/theme';

import {
	metersToKilometers,
	distanceToKilometres,
	getComparisonPaceFromStateData,
	leadingZero,
} from '../util/maths';
import HeadLine from './HeadLine';

interface ComparisonProps {
	data: PaceData;
	imperialData: PaceData;
	mode: string;
	metricPace: Pace;
	imperialPace: Pace;
}

const Comparison = ({
	data,
	imperialData,
	mode,
	metricPace,
	imperialPace,
}: ComparisonProps) => {
	const numRows = 100;
	let rows: number[] = [];
	for (let i = 0; i <= numRows; i++) {
		rows = [...rows, i];
	}

	const timeIsSet = data.hours || data.minutes || data.seconds;
	const isActive = data.distance && timeIsSet;

	return isActive ? (
		<StyledComparison>
			<HeadLine initiallyOpen={false} text={'Comparison'}>
				<TableRow even={false}>
					<TableCell>Distance</TableCell>

					<TableCell>
						Pace{' '}
						{mode == MODE.METRIC
							? `${metricPace.minutes}:${metricPace.seconds}/km`
							: `${imperialPace.minutes}:${imperialPace.seconds}/mi`}
					</TableCell>
				</TableRow>
				<Spacer />
				{rows.map((_: number, idx: number) => {
					if (_ == 0) return;
					const meters = _ * 1000;
					const { total } = getComparisonPaceFromStateData(
						data,
						meters,
						mode,
						_,
					);
					return (
						<TableRow key={idx} even={_ % 2 == 0}>
							<TableCell>{`${_}${
								mode == MODE.METRIC ? 'km' : 'mi'
							}`}</TableCell>
							<TableCell>{`${total.hours ? `${total.hours}h ` : ''} ${
								total.minutes ? `${leadingZero(total.minutes)}m` : ''
							} ${leadingZero(total.seconds)}s`}</TableCell>
						</TableRow>
					);
				})}
			</HeadLine>
		</StyledComparison>
	) : null;
};

const StyledComparison = styled.div`
	font-family: 'Inter', sans-serif;
	position: relative;
	margin-top: 1em;
	// width: 460px;
	// background: ${theme.white};
	// padding: 1em;
	// border-radius: 20px;
	// border: 1px solid ${theme.gray};
`;

const TableRow = styled.div<any>`
	background: ${({ even }) => (even ? theme.gray : theme.white)};
	color: ${theme.black};
	display: flex;
	justify-content: space-around;
	padding: 0.25em;
`;

const Spacer = styled.div`
	height: 2px;
	background: ${theme.gray};
`;

const TableCell = styled.div``;

export default Comparison;
