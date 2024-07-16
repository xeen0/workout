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
		<div className="flex justify-between bg-white border border-gray-200 rounded-lg shadow-lg mt-3  p-4 ">
			<div className="flex items-center font-extrabold">
				<button>
					<svg
						fill="#000000"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 52 52"
						enable-background="new 0 0 52 52"
						className="h-5 w-5 mr-2"
						xml:space="preserve">
						<path
							d="M48.6,23H15.4c-0.9,0-1.3-1.1-0.7-1.7l9.6-9.6c0.6-0.6,0.6-1.5,0-2.1l-2.2-2.2c-0.6-0.6-1.5-0.6-2.1,0
			L2.5,25c-0.6,0.6-0.6,1.5,0,2.1L20,44.6c0.6,0.6,1.5,0.6,2.1,0l2.1-2.1c0.6-0.6,0.6-1.5,0-2.1l-9.6-9.6C14,30.1,14.4,29,15.3,29
			h33.2c0.8,0,1.5-0.6,1.5-1.4v-3C50,23.8,49.4,23,48.6,23z"
						/>
					</svg>
				</button>
				<button className="flex items-center text-black focus:outline-none text-lg font-medium">
					<span>Workout</span>
				</button>
				<button>
					<svg
						className="h-4 w-4 ml-2 text-gray-400"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M20.9888 4.28491L19.6405 2.93089C18.4045 1.6897 16.4944 1.6897 15.2584 2.93089L13.0112 5.30042L18.7416 11.055L21.1011 8.68547C21.6629 8.1213 22 7.33145 22 6.54161C22 5.75176 21.5506 4.84908 20.9888 4.28491Z"
							fill="#030D45"
						/>
						<path
							d="M16.2697 10.9422L11.7753 6.42877L2.89888 15.3427C2.33708 15.9069 2 16.6968 2 17.5994V21.0973C2 21.5487 2.33708 22 2.89888 22H6.49438C7.2809 22 8.06742 21.6615 8.74157 21.0973L17.618 12.1834L16.2697 10.9422Z"
							fill="#030D45"
						/>
					</svg>
				</button>
			</div>
			<button
				className="px-4 py-2 text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-full focus:outline-none"
				onClick={clearGraphNodes}>
				Save Workout
			</button>
		</div>
	);
};

export default Header;
