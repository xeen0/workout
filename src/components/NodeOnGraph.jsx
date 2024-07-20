import { useAtom } from 'jotai';
import { Resizable } from 're-resizable';
import React, { useEffect, useState } from 'react';
import {
	graphNodesAtom,
	graphWidthAtom,
	isResizingAtom,
	totalDistanceAtom,
} from '../Atoms/GraphNodesAtom';

const NodeOnGraph = ({ node }) => {
	const [graphNodes, setGraphNodes] = useAtom(graphNodesAtom);
	const [_, setIsResizing] = useAtom(isResizingAtom);
	const [totalDistance] = useAtom(totalDistanceAtom);
	const [graphWidth] = useAtom(graphWidthAtom);
	const [updatedDistance, setUpdatedDistance] = useState(0);

	useEffect(() => {
		const resizeHandler = document.getElementsByClassName('resize-handle');
		if (resizeHandler) {
			Object.values(resizeHandler).map((r) => {
				r.addEventListener('mouseover', (e) => {
					console.log('mouese Enter');
					setIsResizing(true);
				});
				r.parentNode.parentNode.addEventListener('mouseleave', (e) => {
					setIsResizing(false);
				});
			});
		}
	}, []);
	const onClose = (node) => {
		setGraphNodes(graphNodes.filter((n) => n.uuid !== node.uuid));
	};

	const remToPx = rem => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

	const handleResize = (e, node, item, dir, ref, delta) => {
		graphNodes.forEach((graphNode) => {
			if (graphNode.uuid === node.uuid) {
				graphNode.distances.forEach((d) => {
					if (d._id === item._id) {
						const newDistance =
							d.distance + delta.width * (totalDistance / graphWidth);
						setUpdatedDistance(newDistance);
					}
				});
			}
		});
	};
	const handleResizeStop = (e, node, item, dir, ref, delta) => {
		const updatedGraphNodes = graphNodes.map((graphNode) => {
			if (graphNode.uuid === node.uuid) {
				const updatedDistances = graphNode.distances.map((d) => {
					if (d._id === item._id) {
						return {
							...d,
							distance: Math.max(Number(updatedDistance.toFixed(2)), 0),
						};
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
		setIsResizing(false);
	};
	return (
		<div className="relative bg-transparent group hover:border-gray-100 mx-1">
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
						handleClasses={{ right: 'resize-handle' }}
						handleWrapperClass="resize-handle-wrapper"
						onResizeStop={(e, dir, ref, d) => {
							handleResizeStop(e, node, item, dir, ref, d);
						}}
						onResize={(e, dir, ref, d) => {
							handleResize(e, node, item, dir, ref, d);
						}}
						className="bg-[#9A95F2]"
						minWidth={0}
						bounds={'window'}
						boundsByDirection={true}
						enable={{
							top: false,
							right: true,
							bottom: false,
							left: false,
							topRight: false,
							bottomRight: false,
							bottomLeft: false,
							topLeft: false,
						}}
						size={{
							height: `${remToPx((item.height / 100) * 18)}px`,
							width: `${item.distance * (graphWidth / totalDistance)}px`,
						}}></Resizable>
				))}
			</div>
		</div>
	);
};

export default NodeOnGraph;
