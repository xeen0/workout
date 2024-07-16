import { Draggable } from '@hello-pangea/dnd';
import React from 'react';

function getStyle(style, snapshot, propStyles = {}) {
	if (!snapshot.isDropAnimating) {
		return {
			...style,
			width: snapshot.isDragging ? style.width : propStyles.width,
		};
	}
	return {
		...style,
		width: snapshot.isDragging ? style.width : propStyles.width,
	};
}

const DragabbleNode = ({ id, index, children, propStyles, isResizing }) => {
	return (
		<Draggable
			draggableId={id}
			index={index}
			isDragDisabled={isResizing && id.includes('graphNodes')}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className="w-full max-w-full box-border"
					style={getStyle(provided.draggableProps.style, snapshot, propStyles)}>
					{children}
				</div>
			)}
		</Draggable>
	);
};

export default DragabbleNode;
