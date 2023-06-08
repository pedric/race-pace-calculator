// import type { NextPage } from 'next';
import styled from '@emotion/styled';
import Head from 'next/head';
import Image from 'next/image';
import { PaceData, Pace } from '../types';
import distances, { Distance } from '../util/distances';
import { UNIT } from '../util/constants';
import {
	paceInKmFromStateData,
	paceInmilesFromStateData,
	metersToMilesToCalcMilePce,
	metersToMiles,
	kilometerPerHourPace,
	milesPerHourPace,
} from '../util/maths';
import { useEffect, useState } from 'react';
import { Wrapper, Main } from '../styles/layout';
import TimeTicker from '../components/TimeTicker';
import TimeRange from '../components/TimeRange';
import RaceSelector from '../components/RaceSelector';
import ResultMonitor from '../components/ResultMonitor';
import ModeSwitcher from '../components/ModeSwitcher';

const Home = () => {
	const initialState: PaceData = {
		hours: 0,
		minutes: 0,
		seconds: 0,
		distance: 0,
		raceName: '',
	};

	const [userMode, setUserMode] = useState<string>('select');
	const [mode, setMode] = useState<string>('metric');

	const [data, setData] = useState<PaceData>(initialState);

	const [imperialData, setImperialData] = useState<PaceData>(initialState);

	const initialPace: Pace = { minutes: 0, seconds: 0 };

	const [mph, setMph] = useState<number>(0);
	const [kmh, setKmh] = useState<number>(0);
	const [metricPace, setMetricPace] = useState<Pace>(initialPace);
	const [imperialPace, setImperialPace] = useState<Pace>(initialPace);

	const handleImperialData = () => {
		let milesPace = paceInmilesFromStateData(data);
		setImperialPace(milesPace);
		const converted = metersToMiles(data.distance);
		const distance = Number(converted.toFixed(2));
		const raceName = `${converted.toFixed(2)} miles`;
		setImperialData({ ...data, distance, raceName });
		setMph(milesPerHourPace(data));
	};

	const handleMetricData = () => {
		let kmPace = paceInKmFromStateData(data);
		setMetricPace(kmPace);
		setKmh(kilometerPerHourPace(data));
	};

	useEffect(() => {
		handleMetricData();
		handleImperialData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	const handleTimeChange = (type: string, value: number) => {
		switch (type) {
			case 'hours':
				let hours = value;
				let h: PaceData = { ...data, hours };
				setData(h);
				break;
			case 'minutes':
				let minutes = value;
				let m: PaceData = { ...data, minutes };
				setData(m);
				break;
			case 'seconds':
				let seconds = value;
				let s: PaceData = { ...data, seconds };
				setData(s);
				break;
			default:
				return;
		}
	};

	const handleDistanceChange = (value: number) => {
		const found = distances.filter(
			(item) => item.distance && item.distance === value,
		);
		let raceName = found && found[0]?.name ? found[0].name : '';
		let distance = value;
		let d: PaceData = { ...data, raceName, distance };
		setData(d);
	};

	const timeTick = (unit: string, value: number, timeout = 300) => {
		switch (unit) {
			case UNIT.H:
				const hours = data.hours + value;

				if (hours >= 0) {
					setData({ ...data, hours });
				}
				break;
			case UNIT.M:
				const minutes = data.minutes + value;
				if (minutes >= 0 && minutes < 60) {
					setData({ ...data, minutes });
				}
				break;
			case UNIT.S:
				const seconds = data.seconds + value;
				if (seconds >= 0 && seconds < 60) {
					setData({ ...data, seconds });
				}
				break;
			default:
				return;
		}
	};

	return (
		<>
			<Head>
				<title>Race pace calculator</title>
				<meta name='description' content='Race pace calculator' />
				<link rel='icon' href='/favicon.ico' />
				{/* <link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='true'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Inter:wght@200;400&display=swap'
					rel='stylesheet'
				></link> */}
			</Head>

			<Main>
				<Font>
					<Wrapper>
						{['select', 'free'].map((_, idx) => (
							<button
								className={_ == userMode ? 'active' : ''}
								key={idx}
								onClick={() => setUserMode(_)}
							>
								{_}
							</button>
						))}
						{<p>active mode: {userMode}</p>}
						<RaceSelector
							data={data}
							handleChange={handleDistanceChange}
							userMode={userMode}
							value={data.distance}
						/>
						<ResultMonitor
							data={data}
							imperialData={imperialData}
							metricPace={metricPace}
							imperialPace={imperialPace}
							kmh={kmh}
							mph={mph}
						/>
						<div>
							<Form action='#' onSubmit={(e) => e.preventDefault()}>
								<Control>
									<TimeTicker unit={UNIT.H} timeTick={timeTick} value={-1} />
									<TimeRange
										min={0}
										max={data.distance > 80000 ? 100 : 10}
										defaultValue={data.hours}
										handleChange={handleTimeChange}
										mode={'hours'}
										label={'Hours'}
									/>
									<TimeTicker unit={UNIT.H} timeTick={timeTick} value={1} />
								</Control>
								<Control>
									<TimeTicker unit={UNIT.M} timeTick={timeTick} value={-1} />
									<TimeRange
										min={0}
										max={59}
										defaultValue={data.minutes}
										handleChange={handleTimeChange}
										mode={'minutes'}
										label={'Minutes'}
									/>
									<TimeTicker unit={UNIT.M} timeTick={timeTick} value={1} />
								</Control>
								<Control>
									<TimeTicker unit={UNIT.S} timeTick={timeTick} value={-1} />
									<TimeRange
										min={0}
										max={59}
										defaultValue={data.seconds}
										handleChange={handleTimeChange}
										mode={'seconds'}
										label={'Seconds'}
									/>
									<TimeTicker unit={UNIT.S} timeTick={timeTick} value={1} />
								</Control>
							</Form>
						</div>
					</Wrapper>
				</Font>
				{/* <ModeSwitcher mode={mode} handleChange={setMode} /> */}
			</Main>
		</>
	);
};

const Control = styled.div`
	display: grid;
	grid-template-columns: 1fr 8fr 1fr;
`;

const Font = styled.div`
	font-family: 'Inter', sans-serif;
`;

const Form = styled.form`
	display: grid;
	gap: 1em;
`;

export default Home;
