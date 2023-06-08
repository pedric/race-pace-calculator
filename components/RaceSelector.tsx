import distances, { Distance } from '../util/distances';
import { PaceData, Pace } from '../types';

interface RaceProps {
	data: PaceData;
	value: number | null | undefined;
	userMode: string;
	handleChange: (value: number) => void;
}

const RaceSelector = ({ data, value, userMode, handleChange }: RaceProps) => {
	return (
		<>
			<div>
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
							<input
								type='number'
								value={value || 0}
								onChange={(e) => handleChange(Number(e.target.value))}
							/>
							<span>Meters</span>
						</div>
					)}
				</form>
			</div>
		</>
	);
};

export default RaceSelector;
