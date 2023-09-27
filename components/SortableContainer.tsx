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
import { useState, ReactNode } from 'react';
import Icon from './Icon';

interface ItemProps {
	children: ReactNode;
	identifier: string;
	type: string;
	data: any;
	index: number;
	name?: string | undefined;
}
export const ListItem = ({
	identifier,
	children,
	type,
	data,
	index,
	name,
}: ItemProps) => {
	const {
		setNodeRef,
		setActivatorNodeRef,
		listeners,
		isDragging,
		isSorting,
		over,
		overIndex,
		transform,
		transition,
		attributes,
	} = useSortable({
		id: identifier,
		data: {
			type: type,
			data: data,
			index: index,
		},
	});

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
			<DragItemHeader>
				<Button {...listeners} {...attributes}>
					<Icon icon={'move'} size={24} {...listeners} {...attributes} />
				</Button>
				<Button onClick={() => setOpen(!open)}>
					{name && <Span>{name}</Span>}
					<Span>{type}</Span>
					<Icon icon={open ? 'chevron-down' : 'chevron-up'} size={24} />
				</Button>
			</DragItemHeader>
			{open && <Content>{children}</Content>}
		</StyledItem>
	);
};

const StyledItem = styled.div<any>`
	border: ${({ isDragging }) => (isDragging ? '2px dashed black' : 'none')};
	background: #fff;
	margin-bottom: 1em;
`;

const Span = styled.span<any>`
	font-size: 12px;
	color: gray;
`;

const DragItemHeader = styled.div<any>`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Button = styled.div<any>``;
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
