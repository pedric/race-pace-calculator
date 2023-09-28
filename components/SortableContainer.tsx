import styled from '@emotion/styled';
import {
	AnimateLayoutChanges,
	SortableContext,
	useSortable,
	arrayMove,
	defaultAnimateLayoutChanges,
	verticalListSortingStrategy,
	SortingStrategy,
	horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState, ReactNode, useContext, useEffect } from 'react';
import Icon from './Icon';
import { theme } from '../styles/theme';
import { TrainingplanContext } from '../context/traininplan/TrainingPlanContext';

interface ItemProps {
	children: ReactNode;
	identifier: string;
	type: string;
	data: any;
	index: number;
	name?: string | undefined;
}
export const ListItem = ({ identifier, children, type, data, index, name }: ItemProps) => {
	const { setNodeRef, setActivatorNodeRef, listeners, isDragging, isSorting, over, overIndex, transform, transition, attributes } = useSortable({
		id: identifier,
		data: {
			type: type,
			data: data,
			index: index,
		},
	});

	const { store, periods, setStore } = useContext(TrainingplanContext);

	const [open, setOpen] = useState<Boolean>(false);

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		  }
		: undefined;

	return (
		<StyledItem
			ref={setNodeRef}
			isDragging={isDragging}
			style={style}
			value={identifier}
			// {...listeners}
			// {...attributes}
		>
			<DragItemHeader open={open}>
				<Button {...listeners} {...attributes}>
					<Icon icon={'move'} size={24} {...listeners} {...attributes} />
				</Button>
				{name && <Label>{name}</Label>}
				<Button onClick={() => setOpen(!open)}>
					<Span>{type}</Span>
					<Icon icon={open ? 'chevron-up' : 'chevron-down'} size={24} />
				</Button>
			</DragItemHeader>
			{open && <Content>{children}</Content>}
		</StyledItem>
	);
};

const StyledItem = styled.div<any>`
	border: ${({ isDragging }) => (isDragging ? '2px dashed black' : 'none')};
	// background: #fff;
	margin-bottom: 1em;
	border-radius: 8px;
	overflow: hidden;
	background: ${theme.white};
`;

const Span = styled.span<any>`
	font-size: 12px;
	color: ${theme.gray};
`;

const Label = styled.span<any>`
	font-size: 12px;
	color: ${theme.gray};
	text-transform: uppercase;
`;

const DragItemHeader = styled.div<any>`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: ${theme.white};
	padding: 0.5em 1em;
	margin-bottom: 0.5em;

	${({ open }) =>
		open
			? `
	&::after {
		content: '';
		position: absolute;
		width: 96%;
		height: 1px;
		background: ${theme.gray};
		left: 2%;
		bottom: -0.5em;
		margin-bottom: 0.5em;
	}`
			: ''}
`;

const Button = styled.div<any>`
	display: inline-flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;
const Content = styled.div<any>``;

interface Props {
	children: ReactNode;
	identifiers: string[];
	// type: string;
}

const SortableContainer = ({ children, identifiers }: Props) => {
	return (
		<SortableContext items={identifiers}>
			{/* <div>
				{items.map((_: any, idx: number) => (
					<Item key={idx} identifier={_} />
				))}
			</div> */}
			{children}
		</SortableContext>
	);
};

export default SortableContainer;
