import React, { useState } from 'react';

import { DragDropContext } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from 'uuid';

import {
	DragableNode,
	DropableArea,
	Graph,
	Header,
	Node,
	NodeOnGraph,
	WorkSets,
} from './components';

import useUpdateWidth from './Hooks/useUpdateWidth.js';


import { useAtom } from 'jotai';
import { graphNodesAtom, initialNodesData } from './Atoms/GraphNodesAtom.js';
const App = () => {
	const [data] = useAtom(initialNodesData);
	const [graphNodes, setGraphNodes] = useAtom(graphNodesAtom);
	const [allowDrop, setAllowDrop] = useState([]);
	useUpdateWidth()
	const onDragStart = (start) => {
		const { draggableId, source } = start;
		if (source.droppableId === 'graphArea') {
			setAllowDrop([...allowDrop, 'graphArea']);
		} else if (source.droppableId === 'nodesArea') {
			setAllowDrop([...allowDrop, 'nodesArea', 'graphArea']);
		} else if (source.droppableId === 'workoutArea') {
			setAllowDrop([...allowDrop, 'workoutArea']);
		}
	};
	const onDragEnd = (result) => {
		const { source, destination } = result;
		setAllowDrop([]);
		if (!destination) return;
		if (
			source.droppableId == 'graphArea' &&
			destination.droppableId != 'graphArea'
		)
			return;
		if (
			source.droppableId == 'workoutArea' &&
			destination.droppableId != 'workoutArea'
		)
			return;
		if (
			source.droppableId == 'nodesArea' &&
			destination.droppableId == 'nodesArea'
		)
			return;

		if (source.droppableId === 'nodesArea') {
			const items = [...graphNodes];
			items.splice(destination.index, 0, {
				uuid: uuidv4(),
				type: result.draggableId,
				distances: data[result.draggableId].map((item) => {
					return { distance: 2, ...item };
				}),
				totalDistance: data[result.draggableId]
					.map((item) => 2)
					.reduce((a, b) => a + b, 0),
			});
			setGraphNodes(items);
		} else if (
			source.droppableId === 'graphArea' ||
			source.droppableId === 'workoutArea'
		) {
			const reorderedBars = Array.from(graphNodes);
			const [movedBar] = reorderedBars.splice(source.index, 1);
			reorderedBars.splice(result.destination.index, 0, movedBar);
			setGraphNodes(reorderedBars);
		}
	};

	return (
		<div className="flex justify-center">
			<div className="w-4/5">
				<div>
					<Header />
				</div>
				<div className="w-full">
					<DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
						<div className="flex gap-4">
							<div className="w-1/4 ">
								<DropableArea
									id="nodesArea"
									direction="horizontal"
									isDropDisabled={!allowDrop.includes('nodesArea')}>
									<div className="w-full mx-auto py-2 divide-y divide-gray-200	h-[40vh] bg-white border border-gray-200 rounded-lg shadow-lg mt-3 ">
										<div className="text-center px-2 font-medium text-lg">
											Click or drag the blocks to build workout
										</div>
										<div className="px-4 mx-4 grid grid-flow-row grid-cols-3 gap-x-3 pt-4">
											{Object.keys(data).map((item, index) => (
												<DragableNode id={item} index={index} key={index}>
													<Node key={index} node={data[item]} title={item} />
												</DragableNode>
											))}
										</div>
									</div>
								</DropableArea>
							</div>
							<div className="w-3/4 " id="graphArea">
								<div className="h-[28rem]">
									<DropableArea
										id="graphArea"
										direction="horizontal"
										isDropDisabled={!allowDrop.includes('graphArea')}>
										<Graph nodes={graphNodes}>
											{graphNodes.map((node, index) => (
												<DragableNode
													id={node.uuid + 'graphNodes'}
													node={node}
													index={index}
													propStyles={{
														width: 'fit-content',
													}}
													key={node.uuid}>
													<div>
														<NodeOnGraph key={node.uuid} node={node} />
													</div>
												</DragableNode>
											))}
										</Graph>
									</DropableArea>
								</div>
								<div>
									<DropableArea
										id="workoutArea"
										direction="vertical"
										isDropDisabled={!allowDrop.includes('workoutArea')}>
										{graphNodes.map((node, index) => (
											<DragableNode
												id={node.uuid + 'workout'}
												index={index}
												key={node.uuid}>
												<div key={node.uuid} className="my-2">
													<WorkSets node={node} key={node.uuid} />
												</div>
											</DragableNode>
										))}
									</DropableArea>
								</div>
							</div>
						</div>
					</DragDropContext>
				</div>
			</div>
		</div>
	);
};

export default App;
