import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { graphNodesAtom, selectedWorkoutAtom } from '../Atoms/GraphNodesAtom';

const WorkoutStep = ({ index, level, initialDistance }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [distance, setDistance] = useState(initialDistance);
	const [graphNodes, setGraphNodes] = useAtom(graphNodesAtom);
	const [selectedWorkOut, setSelectedWorkout] = useAtom(selectedWorkoutAtom);

	const handleDistanceClick = () => {
		setIsEditing(true);
	};

	const handleDistanceChange = (e) => {
		if (!e.target.value && e.target.value != 0) return;
		setDistance(e.target.value);
		
	};

	const handleBlur = () => {
		setIsEditing(false);
		let filterNode = graphNodes.filter(
			(item) => {
				let a = JSON.parse(JSON.stringify(item))
				let b = JSON.parse(JSON.stringify(selectedWorkOut))
				delete a.distances[index].distance
				delete a.totalDistance
				delete b.distances[index].distance
				delete b.totalDistance


				return JSON.stringify(a) == JSON.stringify(b) 
			}
		)[0];
		console.log(filterNode)
		if(!filterNode) return
		filterNode.totalDistance =
			filterNode.totalDistance -
			filterNode.distances[index].distance +
			Number(distance);
		filterNode.distances[index].distance = Number(distance);
		setGraphNodes([...graphNodes]);
	};

	return (
		<div
			className={`flex justify-between items-center border-b border-gray-300 py-2`}>
			<div className="flex items-center">
				<div className="cursor-move mr-2">
					<svg
						width="24"
						height="24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M8 6H16M8 12H16M8 18H16"
							stroke="#000"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				<span>
					{level}
					{isEditing}
				</span>
			</div>
			<div className="flex items-center">
				{isEditing ? (
					<input
						type="text"
						value={distance}
						onChange={handleDistanceChange}
						onBlur={handleBlur}
						className="mr-2 border border-gray-300 rounded px-2 py-1 w-20"
						autoFocus
					/>
				) : (
					<span className="mr-2 cursor-pointer" onClick={handleDistanceClick}>
						{distance} km
					</span>
				)}
				<div className="cursor-pointer">
					<svg
						width="24"
						height="24"
						fill="none"
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

const WorkoutBuilder = () => {
	const [selectedWorkOut] = useAtom(selectedWorkoutAtom);

	return (
		<div className="w-4/5 mx-auto mt-5">
			{selectedWorkOut &&
				selectedWorkOut.distances &&
				selectedWorkOut.distances.map((item, index) => (
					<WorkoutStep
						subStep={item}
						index={index}
						key={index}
						level={item.name}
						initialDistance={item.distance}
					/>
				))}
		</div>
	);
};

export default WorkoutBuilder;
