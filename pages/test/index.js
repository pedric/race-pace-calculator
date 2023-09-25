import Context from './Context';
import styled from '@emotion/styled';
import { ReactNode, useContext, useState, useCallback, useRef } from 'react';
import {
	CancelDrop,
	closestCenter,
	pointerWithin,
	rectIntersection,
	CollisionDetection,
	DndContext,
	DragOverlay,
	DropAnimation,
	getFirstCollision,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	Modifiers,
	useDroppable,
	UniqueIdentifier,
	useSensors,
	useSensor,
	MeasuringStrategy,
	KeyboardCoordinateGetter,
	defaultDropAnimationSideEffects,
	useDndMonitor,
} from '@dnd-kit/core';
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

const Droppable = ({
	children,
	columns = 1,
	disabled,
	id,
	items,
	style,
	...props
}) => {
	const {
		active,
		attributes,
		isDragging,
		listeners,
		over,
		setNodeRef,
		transition,
		transform,
	} = useSortable({
		id,
		data: {
			type: 'container',
			children: items,
		},
		animateLayoutChanges,
	});
	const isOverContainer = over
		? (id === over.id && active?.data.current?.type !== 'container') ||
		  items.includes(over.id)
		: false;

	return (
		<div
			ref={disabled ? undefined : setNodeRef}
			style={{
				...style,
				transition,
				transform: CSS.Translate.toString(transform),
				opacity: isDragging ? 0.5 : undefined,
			}}
			hover={isOverContainer}
			handleProps={{
				...attributes,
				...listeners,
			}}
			columns={columns}
			{...props}
		>
			{children}
		</div>
	);
};

const Item = ({ text, identifier }) => {
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
	});

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
			<span>
				<button {...listeners} {...attributes}>
					dra
				</button>
			</span>{' '}
			{text}
		</StyledItem>
	);
};

const StyledItem = styled.div`
	width: 300px;
	padding: 1em;
	margin: 1em auto;
	border: 1px solid gray;
`;

const TestPage = () => {
	const items = ['hej', 'jan', 'banan'];

	return (
		<SortableContext items={items}>
			<div>
				{items.map((_, idx) => (
					<Item key={idx} identifier={_} text={_} />
				))}
			</div>
		</SortableContext>
	);
};

const Page = () => {
	return (
		<Context>
			<TestPage />
		</Context>
	);
};
export default Page;
