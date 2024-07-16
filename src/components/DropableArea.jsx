import { Droppable } from '@hello-pangea/dnd';
import React from 'react';

const DroppableArea = ({
	id,
	children,
	direction = 'Horizaontal',
	isDropDisabled = false,
}) => {
	return (
		<Droppable
			droppableId={id}
			direction={direction}
			isDropDisabled={isDropDisabled}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
					className="overflow-hidden max-w-full max-h-full box-border relative">
					{children}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default DroppableArea;
