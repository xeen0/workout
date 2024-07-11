import React from 'react';

import { DragDropContext } from '@hello-pangea/dnd';
import DragabbleNode from './components/DragableNode.jsx';
import DropableArea from './components/DropableArea.jsx';
import Graph from './components/Graph.jsx';
import Headers from './components/Header.jsx';
import Node from './components/Node.jsx';
import NodeOnGraph from './components/NodeOnGraph.jsx';
import WorkoutBuilder from './components/WorkoutBuilder.jsx';

import { useAtom } from 'jotai';
import { graphNodesAtom, selectedWorkoutAtom } from './Atoms/GraphNodesAtom.js';
const App = () => {
	const data = {
		WarmUp: [
			{
				value: 40,
				height: '1rem',
				name: 'Warm Up',
			},
		],
		Active: [
			{
				value: 80,
				height: '2rem',
				name: 'Active',
			},
		],
		CoolDown: [
			{
				value: 20,
				height: '0.75rem',
				name: 'Cool Down',
			},
		],
		RampUp: [
			{
				value: 20,
				height: '0.75rem',
				name: 'Easy',
			},
			{
				value: 40,
				height: '1rem',
				name: 'Medium',
			},
			{
				value: 60,
				height: '1.5rem',
				name: 'Hard',
			},
			{
				value: 80,
				height: '2rem',
				name: 'Extra Hard',
			},
		],
		RampDown: [
			{
				value: 80,
				height: '2rem',
				name: 'Extra Hard',
			},
			{
				value: 60,
				height: '1.5rem',
				name: 'Hard',
			},
			{
				value: 40,
				height: '1rem',
				name: 'Medium',
			},
			{
				value: 20,
				height: '0.75rem',
				name: 'Easy',
			},
		],
		TwoStep: [
			{
				value: 40,
				height: '1rem',
				name: 'Easy',
			},
			{
				value: 60,
				height: '1.5rem',
				name: 'Hard',
			},
		],
	};
	const [graphNodes, setGraphNodes] = useAtom(graphNodesAtom);
	const [_, setSelectedWorkout] = useAtom(selectedWorkoutAtom);
	const onDragEnd = (result) => {
		const { source, destination } = result;
		if (!destination) return;
		if (source.droppableId === 'nodesArea') {
			setGraphNodes([
				...graphNodes,
				{
					type: result.draggableId,
					distances: data[result.draggableId].map((item) => {
						return { distance: 2, name: item.name, height: item.value };
					}),
					totalDistance: data[result.draggableId]
						.map((item) => 2)
						.reduce((a, b) => a + b),
					height: data[result.draggableId].map((i) => i.value + '%'),
				},
			]);
			selectNodeOnGraph({
				type: result.draggableId,
				distances: data[result.draggableId].map((item) => {
					return { distance: 2, name: item.name, height: item.height };
				}),
				totalDistance: data[result.draggableId]
					.map((item) => 2)
					.reduce((a, b) => a + b),
				height: data[result.draggableId],
			});
		}
		if (source.droppableId === 'graphArea') {
			const reorderedBars = Array.from(graphNodes);
			const [movedBar] = reorderedBars.splice(source.index, 1);
			reorderedBars.splice(result.destination.index, 0, movedBar);
			setGraphNodes(reorderedBars);
		}
	};
	const selectNodeOnGraph = (e) => {
		setSelectedWorkout(e);
	};
	return (
		<div className="flex justify-center">
			<div className="w-4/5">
				<div>
					<Headers />
				</div>
				<div className="w-full">
					<DragDropContext onDragEnd={onDragEnd}>
						<div className="flex">
							<div>
								<DropableArea id="nodesArea">
									<div className="px-4 mx-4">
										{Object.keys(data).map((item, index) => (
											<DragabbleNode
												id={`${item.toString()}`}
												index={index}
												key={item}
												selectNodeOnGraph={() => {}}>
												<Node key={index} node={data[item]} />
											</DragabbleNode>
										))}
									</div>
								</DropableArea>
							</div>
							<div className="w-full">
								<DropableArea id="graphArea">
									<Graph nodes={graphNodes}>
										{graphNodes.map((node, index) => (
											<DragabbleNode
												id={index.toString()}
												node={node}
												index={index}
												key={node}
												selectNodeOnGraph={selectNodeOnGraph}>
												<NodeOnGraph
													key={index}
													node={node}
													totalLength={graphNodes.reduce(
														(sum, a) => sum + a.totalDistance,
														0
													)}
													onClick={(e) => console.log(e)}
												/>
											</DragabbleNode>
										))}
									</Graph>
								</DropableArea>
							</div>
						</div>
					</DragDropContext>
				</div>
				<div>
					<WorkoutBuilder />
				</div>
			</div>
		</div>
	);
};

export default App;
