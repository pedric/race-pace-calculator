import FeatherIcon from 'feather-icons-react';

const TimeTicker = ({ timeTick, unit, value }) => {
	const icon = value == -1 ? 'minus' : 'plus';
	return (
		<button onClick={() => timeTick(unit, value)}>
			<FeatherIcon icon={icon} size={12} />
		</button>
	);
};

export default TimeTicker;
