import { useState, useEffect } from 'react';

const Page = () => {
	const [user, setUser] = useState<any>();

	useEffect(() => {
		console.log('[user]', user);
	}, [user]);

	const handleSubmit = async () => {
		const result = await fetch('/api/strava/id');
		const json = await result.json();
		console.log('SUBMIT', json);
	};
	return (
		<div>
			<div>Strava connect</div>
			<div>
				<input
					type='text'
					value={user}
					onChange={(e) => setUser(e.target.value)}
				/>
				<button onClick={() => handleSubmit()}>GO</button>
			</div>
		</div>
	);
};

export default Page;
