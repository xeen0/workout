import { Draggable } from '@hello-pangea/dnd';
import React from 'react';

function getStyle(style, snapshot) {
	if (!snapshot.isDropAnimating) {
		return style;
	}
	const { moveTo, curve, duration } = snapshot.dropAnimation;
	// move to the right spot
	const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
	// add a bit of turn for fun
	const rotate = 'rotate(0.5turn)';

	// patching the existing style
	return {
		...style,
		transform: `${translate}`,
		// slowing down the drop because we can
		transition: `all ${curve} ${duration + 1}s`,
	};
}

const DragabbleNode = ({
	id,
	index,
	node,
	style,
	children,
	selectNodeOnGraph,
}) => (
	<Draggable draggableId={id} index={index} onClick={() => console.log('s')}>
		{(provided, snapshot) => (
			<div
				ref={provided.innerRef}
				{...provided.draggableProps}
				{...provided.dragHandleProps}
				className="block w-full"
				onClick={() => selectNodeOnGraph(node)}
				// isDragging={snapshot.isDragging && !snapshot.isDropAnimating}
				// style={getStyle(provided.draggableProps.style, snapshot)}
			>
				{children}
			</div>
		)}
	</Draggable>
);

export default DragabbleNode;
