import { Droppable } from '@hello-pangea/dnd';
import React from 'react';

const DroppableArea = ({ id, children }) => {
	return (
		<Droppable droppableId={id}>
			{(provided) => (
				<div ref={provided.innerRef} {...provided.droppableProps}>
					{children}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default DroppableArea;
