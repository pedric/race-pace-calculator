import { useContext, useEffect, useState } from 'react';
import { TrainingplanContext } from '../context/traininplan/TrainingPlanContext';
import styled from '@emotion/styled';
import { theme } from '../styles/theme';
import Icon from './Icon';

const RestoreTrainingPlan = () => {
	const { periods, setStore, resetFromStore } = useContext(TrainingplanContext);
	const [saved, setSaved] = useState<any>(null);
	const [open, setSopen] = useState<boolean>(false);

	const saveData = () => {
		let data: any = [];
		const json = localStorage.getItem('training-schema-periods');
		if (json) {
			data = [...JSON.parse(json)];
		}
		const newSavedItem = {
			date: new Date().toISOString(),
			periods: periods,
		};

		data.push(newSavedItem);
		localStorage.setItem('training-schema-periods', JSON.stringify(data));
	};
	useEffect(() => {
		const json = localStorage.getItem('training-schema-periods');

		if (json) {
			const data = JSON.parse(json);
			setSaved(data);
		}
	}, []);

	const restoreData = (store: any) => {
		resetFromStore(store);
		// setStore(store);
	};

	return (
		<>
			<Column>
				<Button
					onClick={() => {
						saveData();
					}}
				>
					Save plan on this device
				</Button>
			</Column>
			<Column>
				{saved && saved.length > 0 && (
					<Button onClick={() => setSopen(!open)}>
						{open ? 'Hide stored training plans' : 'View stored training plans'}
						<Icon icon={open ? 'chevron-up' : 'chevron-down'} size={12} />
					</Button>
				)}
			</Column>
			<Column>
				{open && (
					<div>
						{saved &&
							saved.map((item: any, idx: number) =>
								item.date && item.periods ? (
									<GridItem>
										<Button key={idx} onClick={() => restoreData(item.periods)}>
											{new Date(item.date).toLocaleString()}
										</Button>
									</GridItem>
								) : null,
							)}
					</div>
				)}
			</Column>
		</>
	);
};

const Button = styled.div`
	color: ${theme.cta};
	line-height: 1.5;

	&:hover {
		cursor: pointer;
	}
`;

const Column = styled.div``;

const GridItem = styled.div``;

export default RestoreTrainingPlan;
