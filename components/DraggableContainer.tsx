import { ReactNode, useState, useContext, useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';
import styled from '@emotion/styled';
import Icon from './Icon';
import { TrainingplanContext } from '../context/traininplan/TrainingPlanContext';

interface DrabbagleProps {
	periodIndex: number;
	index: number;
	open?: boolean;
	type: string;
	data: any;
	buttonText?: string;
	onDragStartFunction: (data: any) => void;
	children: ReactNode;
}

interface Position {
	x: number;
	y: number;
}

const DraggableContainer = ({
	periodIndex,
	index,
	open,
	type,
	data,
	buttonText,
	children,
	onDragStartFunction,
}: DrabbagleProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		setActivatorNodeRef,
		transform,
		isDragging,
	} = useDraggable({
		id: `${type}_${periodIndex}_${index}`,
		data: {
			dragData: data,
			type: type,
			index: index,
			supports: [type],
		},
	});

	const [draggable, setDraggable] = useState<boolean>(false);
	const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
	const { handleSomethingIsDragged, setDraggedType } =
		useContext(TrainingplanContext);

	// useEffect(() => {
	// 	handleSomethingIsDragged(isDragging);
	// 	setDraggedType(type);
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [isDragging, type]);

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		  }
		: undefined;

	return (
		<StyledDraggableContainer
			ref={setNodeRef}
			isDragging={isDragging}
			style={style}

			// {...listeners}
			// {...attributes}

			// draggable={draggable}
			// isDraggable={draggable}
			// position={position}
			// open={open}
			// onDragStart={() => {
			// 	onDragStartFunction(data);
			// }}
			// onDragEnd={() => setDraggable(false)}
		>
			<Button
				// ref={setActivatorNodeRef}
				// onMouseOver={() => setDraggable(true)}
				// onMouseLeave={() => setDraggable(false)}
				// onMouseDown={() => setDraggable(true)}
				// onMouseUp={() => setDraggable(false)}
				{...listeners}
				{...attributes}
			>
				<Icon icon={'move'} size={24}></Icon>
				{/* {buttonText && (
					<Label display={draggable ? true : false}>
						{buttonText}
					</Label>
				)} */}
			</Button>
			<Inner>{children}</Inner>
		</StyledDraggableContainer>
	);
};

/*
position: ${({ isDraggable }) => (isDraggable ? 'fixed' : 'absolute')};
	top: ${({ position, isDraggable }) =>
		isDraggable ? `${position.y}px` : 'unset'};
	left: ${({ position, isDraggable }) =>
		isDraggable ? `${position.x}px` : 'unset'};
	background: ${({ isDraggable }) => (isDraggable ? 'green' : '#fff')};
	grid-template-columns: ${({ open }) =>
		open ? 'repeat(12, 1fr)' : '1fr 1fr'};
	/* grid-template-columns: ${({ open }) =>
		open ? 'repeat(12, 1fr)' : '1fr 1fr'}; 
		border: ${({ draggable }) => (draggable ? `2px dashed black` : 'none')};
	*/

const StyledDraggableContainer = styled.div<any>`
	position: relative;
	padding-left: 32px;
	display: block;
	border: ${({ isDragging }) => (isDragging ? '2px dotted black' : 'none')};
`;
const Inner = styled.div`
	// grid-column: 1 / span 11;
`;

const Button = styled.div`
	// grid-column: 1 / 1;
	position: absolute;
	top: 2px;
	left: 2px;
`;

// const Label = styled.small<any>`
// 	position: absolute;
// 	display: ${({ display }) => (display ? 'block' : 'none')};
// `;

export default DraggableContainer;
