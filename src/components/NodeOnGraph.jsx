import { useAtom } from 'jotai';
import { Resizable } from 're-resizable';
import React from 'react';
import { graphNodesAtom, isResizingAtom } from '../Atoms/GraphNodesAtom';

const NodeOnGraph = ({ node }) => {
	const [graphNodes, setGraphNodes] = useAtom(graphNodesAtom);
	const [_, setIsResizing] = useAtom(isResizingAtom);

	const onClose = (node) => {
		setGraphNodes(graphNodes.filter((n) => n.uuid !== node.uuid));
	};

	const remToPx = (rem) =>
		rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

	const handleResizeStart = (e, node, item, d) => {
		setIsResizing(true);
	};

	const handleResizeStop = (e, node, item, dir, ref, delta) => {
		setIsResizing(false);
		const updatedGraphNodes = graphNodes.map((graphNode) => {
			if (graphNode.uuid === node.uuid) {
				const updatedDistances = graphNode.distances.map((d) => {
					if (d._id === item._id) {
						const newDistance =
							d.distance + (delta.width / ref.parentElement.clientWidth) * node.totalDistance;
						return { ...d, distance: Math.max(Math.floor(newDistance), 0) };
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
		<div className="relative bg-white group hover:border-gray-100 mx-1">
			<div className="absolute -top-6 z-50 left-0 right-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<span className="text-gray-700">
					{node.type
						.replace(/([a-z])([A-Z])/g, '$1 $2')
						.split(' ')
						.map((word) => word[0].toUpperCase() + word.slice(1))
						.join(' ')}
				</span>
				<button className="text-gray-600" onClick={() => onClose(node)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-5 h-5">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<div className="flex items-end w-full gap-1">
				{node.distances.map((item, index) => (
					<Resizable
						key={index}
						onResizeStart={(e, dir, ref, d) =>
							handleResizeStart(e, node, item, d)
						}
						onResizeStop={(e, dir, ref, d) =>
							handleResizeStop(e, node, item, dir, ref, d)
						}
						className="bg-[#9A95F2]"
						minWidth={0}
						maxWidth="100%"
						bounds={'parent'}
						grid={[1, 1]}
						snap={[1, 1]}
						snapGap={1}
						boundsByDirection={true}
						enable={{ top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
						size={{
							height: `${remToPx((item.height / 100) * 18)}px`,
							width: `${(item.distance / node.totalDistance) * 100}%`,
						}}></Resizable>
				))}
			</div>
		</div>
	);
};

export default NodeOnGraph;
