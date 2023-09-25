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

const Context = ({ children }) => {
	const sensors = useSensors(
		useSensor(MouseSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor),
	);

	const [activeId, setActiveId] = useState(null);

	const findContainer = (id) => {
		const items = ['hej', 'jan', 'banan'];
		if (id in items) {
			return id;
		}

		return Object.keys(items).find((key) => items[key].includes(id));
	};

	return (
		<DndContext
			sensors={sensors}
			measuring={{
				droppable: {
					strategy: MeasuringStrategy.Always,
				},
			}}
			onDragStart={({ active }) => {
				setActiveId(active.id);
			}}
			onDragOver={({ active, over }) => {
				const overId = over?.id;

				const overContainer = findContainer(overId);
				const activeContainer = findContainer(active.id);
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

				const overContainer = findContainer(overId);
				const activeContainer = findContainer(active.id);
				if (overContainer) {
					const activeIndex = items[activeContainer].indexOf(active.id);
					const overIndex = items[overContainer].indexOf(overId);

					if (activeIndex !== overIndex) {
						setItems((items) => ({
							...items,
							[overContainer]: arrayMove(
								items[overContainer],
								activeIndex,
								overIndex,
							),
						}));
					}
				}

				setActiveId(null);
			}}
		>
			{children}
		</DndContext>
	);
};

export default Context;
