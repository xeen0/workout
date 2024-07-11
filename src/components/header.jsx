import { useAtom } from 'jotai';
import React from 'react';
import { graphNodesAtom, selectedWorkoutAtom } from '../Atoms/GraphNodesAtom';

const Header = () => {
	const [graphNodes, setGraphNodes] = useAtom(graphNodesAtom);
	const [_, setSelectedWorkout] = useAtom(selectedWorkoutAtom);
	const clearGraphNodes = () => {
		setGraphNodes([]);
		setSelectedWorkout([]);
	};

	return (
		<div className="flex justify-between items-center p-4 bg-white shadow">
			<div className="flex items-center">
				<button
					onClick={() => history.goBack()}
					className="flex items-center text-black focus:outline-none">
					<span>Workout</span>
				</button>
				<button className="ml-2 focus:outline-none">
					<svg
						className="w-6 h-6 text-gray-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M15.232 5.232l3.536 3.536m-2.036-4.036a2.828 2.828 0 114 4l-8.5 8.5a4 4 0 01-1.414 0L7 14l2-2 4.732 4.732a4 4 0 010 1.414l-8.5-8.5a4 4 0 010-1.414L13.196 3.196a4 4 0 011.414 0z"></path>
					</svg>
				</button>
			</div>
			<button
				className="px-4 py-2 text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-full focus:outline-none"
				onClick={clearGraphNodes}>
				Clear Graph
			</button>
		</div>
	);
};

export default Header;
