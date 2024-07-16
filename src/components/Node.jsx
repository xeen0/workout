import { useAtom } from 'jotai';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { graphNodesAtom, initialNodesData } from '../Atoms/GraphNodesAtom';
import Tooltip from './Tooltip';
const Node = ({ node, title }) => {
	const [graphNodes, setGraphNodes] = useAtom(graphNodesAtom);
	const [data] = useAtom(initialNodesData);

	const addNodeToGraph = (node) => {
		setGraphNodes([
			...graphNodes,
			{
				uuid: uuidv4(),
				type: title,
				distances: data[title].map((title) => {
					return { distance: 2, ...title };
				}),
				totalDistance: data[title].map((item) => 2).reduce((a, b) => a + b, 0),
			},
		]);
	};

	return (
		<div className="relative group mx-auto my-2 flex flex-row-reverse bg-[#F2F2F2] border border-gray-200 rounded-lg shadow-lg h-16">
			<div className="absolute left-1/2 bottom-full mb-2 hidden group-hover:block w-96">
				<Tooltip
					text={`${title
						.replace(/([a-z])([A-Z])/g, '$1 $2')
						.split(' ')
						.map((word) => word[0].toUpperCase() + word.slice(1))
						.join(' ')}`}
				/>
			</div>

			<div
				className="flex space-x-1 items-end w-full rounded-b-lg"
				onClick={() => addNodeToGraph(node)}>
				{node.map((item, index) => (
					<div
						className={`relative group bg-[#9A95F2] ${
							index == 0 ? 'rounded-bl-lg' : ''
						} ${index == node.length - 1 ? 'rounded-br-lg' : ''}`}
						style={{
							height: `${(item.height * 4) / 100}rem`,
							width: `${(1 / node.length) * 100}px`,
						}}
						key={index}></div>
				))}
			</div>
		</div>
	);
};

export default Node;
