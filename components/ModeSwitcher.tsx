interface Mode {
	mode: string;
	handleChange: (_: string) => void;
}

const ModeSwitcher = ({ mode, handleChange }: Mode) => {
	return (
		<>
			{['metric', 'imperial'].map((_, idx) => (
				<button
					className={_ == mode ? 'active' : ''}
					key={idx}
					onClick={() => handleChange(_)}
				>
					{_}
				</button>
			))}
			{<p>active mode: {mode}</p>}
		</>
	);
};

export default ModeSwitcher;
