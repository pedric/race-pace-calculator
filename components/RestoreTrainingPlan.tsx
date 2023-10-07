import { useContext, useEffect, useState } from 'react';
import { TrainingplanContext } from '../context/traininplan/TrainingPlanContext';
import styled from '@emotion/styled';
import { theme } from '../styles/theme';
import Icon from './Icon';
import { InputWrapper } from '../styles/components';

const RestoreTrainingPlan = () => {
	const { periods, setStore, resetFromStore } = useContext(TrainingplanContext);
	const [saved, setSaved] = useState<any>(null);
	const [open, setOpen] = useState<boolean>(false);
	const [copied, setCopied] = useState<boolean>(false);
	const [openSaveDialog, setOpenSaveDialog] = useState<boolean>(false);
	const [name, setName] = useState<string>('');

	const saveData = () => {
		let data: any = [];
		const json = localStorage.getItem('training-schema-periods');
		if (json) {
			data = [...JSON.parse(json)];
		}
		const newSavedItem = {
			name,
			date: new Date().toISOString(),
			periods: periods,
		};

		data.push(newSavedItem);
		localStorage.setItem('training-schema-periods', JSON.stringify(data));
		getSaved();
		setOpenSaveDialog(!openSaveDialog);
		setName('');
		setOpen(true);
	};

	const deleteItem = (date: string) => {
		let data: any = [];
		const json = localStorage.getItem('training-schema-periods');
		if (json) {
			data = [...JSON.parse(json)];
		}
		if (data.length > 0) {
			const newSavedItems = data.filter((_: any) => _.date != date);
			localStorage.setItem('training-schema-periods', JSON.stringify(newSavedItems));
		}
		getSaved();
	};

	const getSaved = () => {
		const json = localStorage.getItem('training-schema-periods');
		if (json) {
			const data = JSON.parse(json);
			setSaved(data);
		}
	};

	useEffect(() => {
		getSaved();
	}, []);

	const restoreData = (store: any) => {
		resetFromStore(store);
		setOpen(!open);
	};

	return (
		<>
			<Column>
				<Control
					onClick={() => {
						setOpenSaveDialog(!openSaveDialog);
					}}
				>
					Save plan on this device
				</Control>
			</Column>
			{openSaveDialog && (
				<Column>
					<InputWrapper>
						<label>Name</label>
						<input type='text' value={name} onChange={(e) => setName(e.target.value)} />
						{name && (
							<BigButton
								role='button'
								onClick={() => {
									saveData();
								}}
							>
								Save
							</BigButton>
						)}
					</InputWrapper>
				</Column>
			)}
			<Column>
				{saved && saved.length > 0 && (
					<Control onClick={() => setOpen(!open)}>
						{open ? 'Hide stored training plans' : 'View stored training plans'}
						<Icon icon={open ? 'chevron-up' : 'chevron-down'} size={24} />
					</Control>
				)}
			</Column>
			<Column>
				{open && (
					<div>
						{saved &&
							saved.map((item: any, idx: number) =>
								item.date && item.periods ? (
									<GridItem key={idx}>
										<Button key={idx} onClick={() => restoreData(item.periods)}>
											{item.name ? `${item.name} - ` : ''}
											{new Date(item.date).toLocaleString()}
										</Button>
										<DeleteButton onClick={() => deleteItem(item.date)}>Delete</DeleteButton>
									</GridItem>
								) : null,
							)}
					</div>
				)}
			</Column>
			<Column>
				<Control
					onClick={() => {
						navigator.clipboard.writeText(`${window.location}/?state=${JSON.stringify(periods)}`);
						setCopied(true);
						setTimeout(() => {
							setCopied(false);
						}, 2000);
					}}
				>
					Copy plan link <Icon icon={copied ? 'check' : 'copy'} />
				</Control>
			</Column>
		</>
	);
};

const Button = styled.div`
	color: ${theme.cta};
	line-height: 1.5;
	text-transform: uppercase;

	&:hover {
		cursor: pointer;
		text-decoration: underline;
	}
`;

const Control = styled.div`
	color: ${theme.cta};
	background: rgba(255, 255, 255, 0.65);
	line-height: 1.5;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.5em;
	border-radius: 4px;
	margin: 0.5em 0;

	&:hover {
		cursor: pointer;
		text-decoration: underline;
	}
`;

const BigButton = styled.div`
	background: ${theme.cta};
	color: ${theme.white};
	display: inline-block;
	padding: 0.5em 1em;
	margin: 0.5em 0.5em 1em;
	border-radius: 9999px;

	&:hover {
		cursor: pointer;
	}
`;

const Column = styled.div``;

const GridItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin: 0.5em 0;
`;

const DeleteButton = styled.span`
	color: tomato;
	text-transform: uppercase;
	font-size: 12px;
	margin-left: 1em;

	&:hover {
		cursor: pointer;
		text-decoration: underline;
	}
`;

export default RestoreTrainingPlan;
