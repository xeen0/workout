import { useAtom } from 'jotai';
import React from 'react';
import { graphNodesAtom, selectedWorkoutAtom } from '../Atoms/GraphNodesAtom';

const Node = ({ node, addNode }) => {
	const [graphNodes, setGraphNodes] = useAtom(graphNodesAtom);
	const [selectedWorkOut, setSelectedWorkout] = useAtom(selectedWorkoutAtom);
	const addNodeToGraph = (node) => {
		setGraphNodes([
			...graphNodes,
			{
				type: node[0].type,
				distances: node.map((item) => {
					return { distance: 2, name: item.name, height: item.value };
				}),
				totalDistance: node.map((item) => 2).reduce((a, b) => a + b),
				height: node.map((i) => i.value + '%'),
			},
		]);
		setSelectedWorkout({
			type: node[0].type,
			distances: node.map((item) => {
				return { distance: 2, name: item.name, height: item.value };
			}),
			totalDistance: node.map((item) => 2).reduce((a, b) => a + b),
			height: node.map((i) => i.value + '%'),
		});
	};
	return (
		<div className="mx-auto my-2 px-2 flex  flex-row-reverse bg-white border border-gray-200 rounded-lg shadow-lg min-h-14">
			<div
				className="flex space-x-1 items-end w-full"
				onClick={() => addNodeToGraph(node)}>
				{node.map((item, index) => (
					<div
						className="bg-blue-500"
						style={{
							height: `${item.height}`,
							width: `${(1 / node.length) * 100}px`,
						}}
						key={index}></div>
				))}
			</div>
		</div>
	);
};

export default Node;
