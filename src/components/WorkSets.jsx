import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { graphNodesAtom } from '../Atoms/GraphNodesAtom';
import Tooltip from './Tooltip.jsx';
const WorkOutSteps = ({ step, node }) => {
	const [distance, setDistance] = useState(step.distance);
	const [isEditing, setIsEditing] = useState(false);
	const [graphNodes, setGraphNodes] = useAtom(graphNodesAtom);
	useEffect(() => {
		setDistance(step.distance);
	}, [step]);
	const handleDistanceChange = (e, node, step) => {
		setDistance(Number(e.target.value));
		const updatedGraphNodes = graphNodes.map((graphNode) => {
			if (graphNode.uuid === node.uuid) {
				const updatedDistances = graphNode.distances.map((d) => {
					if (d._id === step._id) {
						return { ...d, distance: Number(e.target.value) };
					}
					return d;
				});

				const updatedTotalDistance = updatedDistances.reduce(
					(total, d) => total + d.distance,
					0
				);

				return {
					...graphNode,
					distances: updatedDistances,
					totalDistance: updatedTotalDistance,
				};
			}
			return graphNode;
		});

		setGraphNodes(updatedGraphNodes);
	};
	return (
		<div className="flex items-center justify-between p-4 hover:bg-purple-100 rounded-lg">
			<div className="flex items-center">
				<span className="text-gray-700">{step.name}</span>
			</div>
			<div className="flex items-center">
				{isEditing ? (
					<input
						type="text"
						value={distance}
						onChange={(e) => {
							handleDistanceChange(e, node, step);
						}}
						onBlur={() => {
							setIsEditing(false);
						}}
						className="mr-2 border border-gray-300 rounded px-2 py-1 w-20"
						autoFocus
					/>
				) : (
					<span
						className="mr-2 cursor-pointer"
						onClick={() => {
							setIsEditing(true);
						}}>
						{distance} km
					</span>
				)}
				<div className="cursor-pointer relative group">
					<div className="absolute left-1/2 bottom-full mb-2 hidden group-hover:block w-56 z-50 overflow-visible">
						<Tooltip text="Click to Edit value" />
					</div>
					<svg
						width="24"
						height="24"
						fill="none"
						className="mr-4"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
							stroke="#000"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
};

const WorkOuts = ({ node }) => {
	return (
		<div className="flex flex-col p-4 divide-y-2 bg-white rounded-lg shadow-md border ">
			<div className="flex mb-4">
				<button className="text-gray-600">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6.75 12a.75.75 0 100 1.5h10.5a.75.75 0 100-1.5H6.75zM6.75 6a.75.75 0 100 1.5h10.5a.75.75 0 100-1.5H6.75zM6.75 18a.75.75 0 100 1.5h10.5a.75.75 0 100-1.5H6.75z"
						/>
					</svg>
				</button>
				<h2 className="text-lg font-semibold">
					{node.type
						.replace(/([a-z])([A-Z])/g, '$1 $2')
						.split(' ')
						.map((word) => word[0].toUpperCase() + word.slice(1))
						.join(' ')}
				</h2>
			</div>

			{node &&
				node.distances.map((step) => {
					return (
						<div key={step._id} className="py-2">
							<WorkOutSteps step={step} node={node} />
						</div>
					);
				})}
		</div>
	);
};
export default WorkOuts;
