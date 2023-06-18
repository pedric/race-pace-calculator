import styled from '@emotion/styled';
import distances, { Distance } from '../util/distances';
import { PaceData, Pace } from '../types';

interface RaceProps {
	data: PaceData;
	value?: number;
	userMode: string;
	units: string;
	handleChange: (value: number) => void;
}

const RaceSelector = ({
	data,
	value,
	userMode,
	units,
	handleChange,
}: RaceProps) => {
	return (
		<>
			<DistanceControls>
				<form action='#' onSubmit={(e) => e.preventDefault()}>
					{userMode == 'select' && (
						<div>
							<select onChange={(e) => handleChange(Number(e.target.value))}>
								{distances.map((distance: Distance) => (
									<option key={distance.distance} value={distance.distance}>
										{distance.name}
									</option>
								))}
							</select>
						</div>
					)}
					{userMode == 'free' && (
						<div>
							<div>
								Enter distance in {units == 'metric' ? 'meters' : 'miles'}
							</div>
							<input
								type='number'
								value={value}
								onChange={(e) => handleChange(Number(e.target.value))}
							/>
						</div>
					)}
				</form>
			</DistanceControls>
		</>
	);
};

const DistanceControls = styled.div`
	select {
		width: 100%;
	}

	input[type='number'] {
		width: 100%;
	}
`;

export default RaceSelector;
