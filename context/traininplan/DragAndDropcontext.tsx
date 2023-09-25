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
import { TrainingplanContext } from './TrainingPlanContext';

interface Props {
	children: ReactNode;
}

function Monitor() {
	// Monitor drag and drop events that happen on the parent `DndContext` provider
	useDndMonitor({
		// onDragStart(e) {
		// 	console.log('onDragStart', e);
		// },
		// onDragMove(e) {
		// 	console.log('onDragMove', e);
		// },
		onDragOver(e) {
			console.log('onDragOver', e);
		},
		onDragEnd(e) {
			console.log('onDragEnd', e);
		},
		onDragCancel(e) {
			console.log('onDragCancel', e);
		},
	});

	return <div></div>;
}

const DragAndDropcontext = ({ children }: Props) => {
	const sensors = useSensors(
		useSensor(MouseSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor),
	);
	const [clonedItems, setClonedItems] = useState<any>(null);
	const [isDragging, setIsDragging] = useState(false);
	const { handleDrop, handleSomethingIsDragged, setDraggedType } =
		useContext(TrainingplanContext);

	const handleDragEnd = (e: any) => {
		const { active, over, activatorEvent } = e;

		setIsDragging(false);
		if (over && active.data.current.supports.includes(over.data.current.type)) {
			// do stuff
			console.log('hovred!', activatorEvent.target);
		}

		console.log('dropped!', e);
		if (over && active) {
			const data = active.data?.current?.dragData
				? active.data.current.dragData
				: null;
			const draggedIndex = active.data?.current?.index
				? active.data.current.index
				: null;
			const draggedType = active.data?.current?.type
				? active.data.current.type
				: null;
			if (data && draggedIndex && draggedType) {
				handleDrop(draggedType, data, draggedIndex);
			}
		}
	};

	const handleDragStart = (e: any) => {
		// console.log('handleDragStart', e);
		const { active, over, activatorEvent } = e;
		setDraggedType(
			active?.data?.current?.type ? active.data.current.type : null,
		);
		// handleSomethingIsDragged(true);
		// setIsDragging(true);
	};

	return (
		<DndContext
			id={'trainingplandroppable'}
			// onDragStart={(e) => handleDragStart(e)}
			// onDragEnd={handleDragEnd}
			measuring={{
				droppable: {
					strategy: MeasuringStrategy.Always,
				},
			}}

			// cancelDrop={cancelDrop}
			// onDragCancel={onDragCancel}
			// modifiers={modifiers}
		>
			<Monitor />
			{children}
			{/* <DragOverlay>{isDragging ? children : null}</DragOverlay> */}
		</DndContext>
	);
};

export default DragAndDropcontext;
