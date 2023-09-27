import styled from '@emotion/styled';
import { useSortable } from '@dnd-kit/sortable';
import { rectSortingStrategy, AnimateLayoutChanges } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { useState, useContext } from 'react';
import { TrainingplanContext } from '../context/traininplan/TrainingPlanContext';

interface DropZoneProps {
	type: string;
	index: number;
	data: any | null;
	onDropFunction: (data: any, index: number) => void;
}

const DropZone = ({ type, index, data, onDropFunction }: DropZoneProps) => {
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
		id: `${type}_${index}`,
		data: {
			// type: 'container',
			// children: items,
			id: index,
			type: type,
			data: data,
		},
		// animateLayoutChanges,
	});
	// const isOverContainer = over
	// 	? (id === over.id && active?.data.current?.type !== type) ||
	// 	  items.includes(over.id)
	// 	: false;

	// const { isOver, setNodeRef, over, node, transition } = useSortable({
	// 	id: `${type}`,
	// 	data: {
	// 		id: index,
	// 		type: type,
	// 		data: data,
	// 	},
	// 	animateLayoutChanges,
	// });
	const [draggedOver, setIsDraggedOver] = useState<number | undefined>(
		undefined,
	);
	const { someThingIsDragged, draggedType } = useContext(TrainingplanContext);

	console.log('drop zone draggedType', draggedType);
	console.log('drop zone type', type);
	console.log('drop zone over', over);

	return (
		<Zone
		// isOver={isOver}
		// ref={setNodeRef}
		>
			<Inner
			// isOver={isOver}
			// ref={setNodeRef}
			// isActive={isOver && type == draggedType}
			// onDragOver={(e: any) => {
			// 	e.preventDefault();
			// 	setIsDraggedOver(index);
			// }}
			// onMouseOver={(e) => {
			// 	e.preventDefault();
			// 	setIsDraggedOver(index);
			// }}
			// onDrop={(e: any) => {
			// 	e.preventDefault();
			// 	setIsDraggedOver(undefined);
			// 	onDropFunction(data, index);
			// }}
			// onMouseUp={(e: any) => {
			// 	e.preventDefault();
			// 	setIsDraggedOver(undefined);
			// 	onDropFunction(data, index);
			// }}
			// onDragLeave={() => setIsDraggedOver(undefined)}
			// onMouseLeave={() => setIsDraggedOver(undefined)}
			></Inner>
		</Zone>
	);
};

const Zone = styled.div<any>`
	position: relative;
	height: 20px;
`;

const Inner = styled.div<any>`
	position: absolute;
	border: 1px solid purple;
	background: blue;
	border: ${({ isActive }) => (isActive ? '3px dashed red' : 'none')};
	// height: ${({ active }) => (active ? '100px' : '10px')};
	height: ${({ isOver }) => (isOver ? '100px' : '10px')};
	left: 0;
	right: 0;
	// top: ${({ active }) => (active ? '-50px' : '0')};
	// bottom: ${({ active }) => (active ? '-50px' : '0')};
	top: ${({ isOver }) => (isOver ? '-50px' : '0')};
	bottom: ${({ isOver }) => (isOver ? '-50px' : '0')};
	transition: all 250ms linear;
`;

export default DropZone;

// div {
// 	position: absolute;
// 	border: 1px solid purple;
// 	background: blue;
// 	// height: ${({ active }) => (active ? '100px' : '10px')};
// 	height: ${({ isOver }) => (isOver ? '100px' : '10px')};
// 	left: 0;
// 	right: 0;
// 	// top: ${({ active }) => (active ? '-50px' : '0')};
// 	// bottom: ${({ active }) => (active ? '-50px' : '0')};
// 	top: ${({ isOver }) => (isOver ? '-50px' : '0')};
// 	bottom: ${({ isOver }) => (isOver ? '-50px' : '0')};
// 	transition: all 250ms linear;
// }
