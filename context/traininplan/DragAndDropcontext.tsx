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
	const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor), useSensor(KeyboardSensor));
	const [clonedItems, setClonedItems] = useState<any>(null);
	const [isDragging, setIsDragging] = useState(false);
	const { activeId, handleDrop, handleSomethingIsDragged, setDraggedType, setActiveId } = useContext(TrainingplanContext);

	const handleDragEnd = (e: any) => {
		const { active, over, activatorEvent } = e;

		setIsDragging(false);
		if (over && active.data.current.supports.includes(over.data.current.type)) {
			// do stuff
			console.log('hovred!', activatorEvent.target);
		}

		console.log('dropped!', e);
		if (over && active) {
			const data = active.data?.current?.dragData ? active.data.current.dragData : null;
			const draggedIndex = active.data?.current?.index ? active.data.current.index : null;
			const draggedType = active.data?.current?.type ? active.data.current.type : null;
			if (data && draggedIndex && draggedType) {
				handleDrop(draggedType, data, draggedIndex);
			}
		}
	};

	const handleDragStart = (e: any) => {
		// console.log('handleDragStart', e);
		const { active, over, activatorEvent } = e;
		setDraggedType(active?.data?.current?.type ? active.data.current.type : null);
		// handleSomethingIsDragged(true);
		// setIsDragging(true);
	};

	return (
		<DndContext
			sensors={sensors}
			onDragStart={({ active }) => {
				setActiveId(active.id);
			}}
			// onDragStart={(e) => handleDragStart(e)}
			// onDragEnd={handleDragEnd}
			measuring={{
				droppable: {
					strategy: MeasuringStrategy.Always,
				},
			}}
			onDragOver={({ active, over }) => {
				const overId = over?.id;
				console.log('onDragOver active', active);
				console.log('onDragOver over', over);

				// const overContainer = findContainer(overId);
				// const activeContainer = findContainer(active.id);
			}}
			onDragEnd={({ active, over }) => {
				const overId = over?.id;
				const items = ['hej', 'jan', 'banan'];
				console.log('active', active);
				console.log('over', over);
				// if (active.id in items && over?.id) {
				// 	console.log(2);
				// 	setContainers((containers) => {
				// 		const activeIndex = containers.indexOf(active.id);
				// 		const overIndex = containers.indexOf(over.id);

				// 		return arrayMove(containers, activeIndex, overIndex);
				// 	});
				// }

				// const overContainer = findContainer(overId);
				// const activeContainer = findContainer(active.id);
				// if (overContainer) {
				// 	const activeIndex = items[activeContainer].indexOf(active.id);
				// 	const overIndex = items[overContainer].indexOf(overId);

				// 	if (activeIndex !== overIndex) {
				// 		setItems((items) => ({
				// 			...items,
				// 			[overContainer]: arrayMove(
				// 				items[overContainer],
				// 				activeIndex,
				// 				overIndex,
				// 			),
				// 		}));
				// 	}
				// }

				setActiveId(null);
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
