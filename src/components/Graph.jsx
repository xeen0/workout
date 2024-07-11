import { useAtom } from 'jotai';
import React from 'react';
import { graphNodesAtom } from '../Atoms/GraphNodesAtom';

const Graph = ({ children }) => {
	const [nodes] = useAtom(graphNodesAtom);
	return (
		<div className="w-full mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg mt-3">
			{nodes.length == 0 && (
				<div className="mb-4 text-lg font-medium ">
					Click the blocks or drag them here to begin building your workout.
				</div>
			)}
			<div className="relative flex ">
				<div className="flex flex-col justify-between items-end pr-2 text-xs  h-56">
					{['100%', '75%', '50%', '25%', '0%'].map((label, index) => (
						<span key={index} className="leading-none">
							{label}
						</span>
					))}
				</div>
				<div className="relative flex flex-auto self-end  items-end  h-16 ">
					{children}
				</div>
			</div>
			<div className="flex justify-between text-xs ml-10 mt-2">
				<span className="text-left">0</span>
				{[
					...Array(
						nodes.reduce((sum, a) => sum + a.totalDistance, 0) + 1
					).keys(),
				].map(
					(_, index) =>
						index != 0 && (
							<span
								key={index}
								className={`flex-1 ${index == 0 ? 'text-left' : 'text-right'}`}>
								{index}
							</span>
						)
				)}
			</div>
		</div>
	);
};

export default Graph;
