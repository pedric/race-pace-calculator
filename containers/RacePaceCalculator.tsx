import RaceMenu from '../components/RaceMenu';
import styled from '@emotion/styled';
import Head from 'next/head';
import Image from 'next/image';
import { PaceData, Pace } from '../types';
import distances, { Distance } from '../util/distances';
import { UNIT, MODE, INPUT } from '../util/constants';
import {
	paceInKmFromStateData,
	paceInmilesFromStateData,
	metersToMiles,
	milesToMeters,
	kilometerPerHourPace,
	milesPerHourPace,
} from '../util/maths';
import { useEffect, useState } from 'react';
import TimeTicker from '../components/TimeTicker';
import TimeRange from '../components/TimeRange';
import RaceSelector from '../components/RaceSelector';
import ResultMonitor from '../components/ResultMonitor';
import RangeControl from '../components/RangeControl';
import { theme } from '../styles/theme';
import PaceEditor from '../components/PaceEditor';

const RacePaceCalculator = () => {
	const initialState: PaceData = {
		hours: 0,
		minutes: 0,
		seconds: 0,
		distance: 0,
		raceName: '',
	};

	const [userMode, setUserMode] = useState<string>(INPUT.SELECT);
	const [mode, setMode] = useState<string>(MODE.METRIC);

	const [data, setData] = useState<PaceData>(initialState);

	const [raceDistance, setRaceDistance] = useState<number>(
		initialState.distance,
	);

	// const [metricData, setMetricData] = useState<PaceData>(initialState);
	const [imperialData, setImperialData] = useState<PaceData>(initialState);

	const initialPace: Pace = { minutes: 0, seconds: 0 };

	const [mph, setMph] = useState<number>(0);
	const [kmh, setKmh] = useState<number>(0);
	const [metricPace, setMetricPace] = useState<Pace>(initialPace);
	const [imperialPace, setImperialPace] = useState<Pace>(initialPace);

	const handleImperialData = () => {
		// const { distance } = data;
		let milesPace = paceInmilesFromStateData(data);
		setImperialPace(milesPace);
		const converted = Number(metersToMiles(data.distance));
		const distance = Number(converted.toFixed(2));
		const raceName = `${distance.toFixed(2)} miles`;
		setImperialData({ ...data, distance, raceName });
		setMph(milesPerHourPace(data));
	};

	const handleMetricData = () => {
		let kmPace = paceInKmFromStateData(data);
		setMetricPace(kmPace);
		const converted =
			mode == MODE.METRIC
				? data.distance
				: Number(milesToMeters(data.distance));
		const distance = Number(converted.toFixed(2));
		// setMetricData({ ...data, distance });
		setKmh(kilometerPerHourPace(data));
	};

	useEffect(() => {
		setData({ ...data, distance: raceDistance });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [raceDistance]);

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
		let distance = mode === MODE.IMPERIAL ? milesToMeters(value, true) : value;
		console.log('distance-->', distance);
		let d: PaceData = { ...data, raceName, distance };
		setRaceDistance(value);
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
			</Head>

			<Font>
				<Wrapper>
					{/* <H1>Race pace calculator</H1>
					<Guide>
						Select from classic distances or enter your own distance.
					</Guide> */}
					<RaceSelector
						data={data}
						handleChange={handleDistanceChange}
						userMode={userMode}
						setUserMode={setUserMode}
						value={data.distance}
						imperialValue={imperialData.distance}
						units={mode}
						raceDistance={raceDistance}
						setRaceDistance={setRaceDistance}
					/>
					<RaceMenu
						inputChoice={userMode}
						setInputChoice={setUserMode}
						units={mode}
						setUnits={setMode}
					/>
					<ResultMonitor
						data={data}
						imperialData={imperialData}
						metricPace={metricPace}
						imperialPace={imperialPace}
						kmh={kmh}
						mph={mph}
						mode={mode}
					/>
					<div>
						<PaceEditor
							metricPace={metricPace}
							imperialPace={imperialPace}
							mode={mode}
							data={data}
							setData={setData}
						/>
						<Form action='#' onSubmit={(e) => e.preventDefault()}>
							{/* <RangeControl /> */}
							<Control>
								<TimeTicker unit={UNIT.H} timeTick={timeTick} value={-1} />
								<TimeRange
									min={0}
									max={data.distance > 80000 ? 100 : 10}
									value={data.hours}
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
									value={data.minutes}
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
									value={data.seconds}
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
		</>
	);
};

const Guide = styled.div`
	text-align: center;
	font-size: 0.9em;
	font-weight: 200;
	color: ${theme.gray};
`;

const H1 = styled.h1`
	text-align: center;
	margin-bottom: 0.25em;
`;

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

const Wrapper = styled.div`
	margin: 0.5em;
`;

const Sorry = styled.span`
	color: ${theme.strong};
	text-transform: uppercase;
	text-decoration: underline;
`;

export default RacePaceCalculator;
