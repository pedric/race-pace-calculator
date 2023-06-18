import { useState } from 'react';
import { Range } from 'react-range';

const RangeControl = () => {
	const [state, setState] = useState({ values: [0, 100] });

	const handleState = (value) => {
		console.log(value);
	};
	return (
		<Range
			step={0.1}
			min={0}
			max={100}
			values={state.values}
			onChange={(values) => handleState({ values })}
			renderTrack={({ props, children }) => (
				<div
					{...props}
					style={{
						...props.style,
						height: '6px',
						width: '100%',
						backgroundColor: '#ccc',
					}}
				>
					{children}
				</div>
			)}
			renderThumb={({ props }) => (
				<div
					{...props}
					style={{
						...props.style,
						height: '42px',
						width: '42px',
						backgroundColor: '#999',
					}}
				/>
			)}
		/>
	);
};

export default RangeControl;
