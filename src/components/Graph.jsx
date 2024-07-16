import { useAtom } from 'jotai';
import React from 'react';
import { graphNodesAtom, totalDistanceAtom } from '../Atoms/GraphNodesAtom';
import emptyGraphImg from '../assets/emptyGraph.png';
const Graph = ({ children }) => {
	const [nodes, setNodes] = useAtom(graphNodesAtom);
	const [totalDistance] = useAtom(totalDistanceAtom);
	return (
		<div className="w-full mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg mt-3">
			<div className="mb-4 text-lg font-medium flex justify-end ">
				<button
					className="bg-gray-100 px-2 py-2 rounded-lg cursor-pointer"
					onClick={() => setNodes([])}>
					{' '}
					Clear Graph
				</button>
			</div>
			<div className="relative flex ">
				<div className="flex flex-col justify-between items-end pr-2 text-xs h-72">
					{['150%', '100%', '75%', '50%', '25%', '0%'].map((label, index) => (
						<span key={index} className="leading-none text-gray-400">
							{label}
						</span>
					))}
				</div>
				<div className="w-full flex self-end gap-2 items-end h-16 ">
					{nodes.length == 0 && (
						<div className="mb-4 text-lg font-medium ">
							<img src={emptyGraphImg} alt="Empty Graph Img" />
						</div>
					)}
					{children}
				</div>
			</div>
			<div className="flex justify-between text-xs ml-10 mt-2">
				{totalDistance != 0 && (
					<span className="text-left text-gray-400">0</span>
				)}
				{[...Array(Math.ceil(totalDistance) + 1 || 0)].map(
					(_, index) =>
						index != 0 && (
							<span
								key={index}
								className={` text-gray-400 flex-1 ${
									index == 0 ? 'text-left' : 'text-right'
								} ${
									index % 2 == 0 || index == totalDistance || true
										? 'visible'
										: 'invisible'
								}`}>
								{index}
							</span>
						)
				)}
			</div>
		</div>
	);
};

export default Graph;
