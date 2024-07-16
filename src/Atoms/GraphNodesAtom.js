import { atom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';

export const graphNodesAtom = atom([]);
export const selectedWorkoutAtom = atom([]);
export const totalDistanceAtom = atom((get) => {
	const graphNodes = get(graphNodesAtom);
	let total = graphNodes.reduce((total, item) => {
		const distancesTotal = item.distances.reduce((distSum, dist) => {
			return distSum + dist.distance;
		}, 0);
		return total + distancesTotal;
	}, 0);
	return total;
});

export const isResizingAtom = atom(false);
export const initialNodesData = atom({
	WarmUp: [
		{
			_id: uuidv4(),
			height: 40,
			distance: 2,
			name: 'Warm Up',
		},
	],
	Active: [
		{
			_id: uuidv4(),
			height: 80,
			distance: 2,
			name: 'Active',
		},
	],
	CoolDown: [
		{
			_id: uuidv4(),
			height: 20,
			distance: 2,
			name: 'Cool Down',
		},
	],
	RampUp: [
		{
			_id: uuidv4(),
			height: 20,
			distance: 2,
			name: 'Easy',
		},
		{
			_id: uuidv4(),
			height: 40,
			distance: 2,
			name: 'Medium',
		},
		{
			_id: uuidv4(),
			height: 60,
			distance: 2,
			name: 'Hard',
		},
		{
			_id: uuidv4(),
			height: 80,
			distance: 2,
			name: 'Extra Hard',
		},
	],
	RampDown: [
		{
			_id: uuidv4(),
			height: 80,
			distance: 2,
			name: 'Extra Hard',
		},
		{
			_id: uuidv4(),
			height: 60,
			distance: 2,
			name: 'Hard',
		},
		{
			_id: uuidv4(),
			height: 40,
			distance: 2,
			name: 'Medium',
		},
		{
			_id: uuidv4(),
			height: 20,
			distance: 2,
			name: 'Easy',
		},
	],
	TwoStep: [
		{
			_id: uuidv4(),
			height: 40,
			distance: 2,
			name: 'Easy',
		},
		{
			_id: uuidv4(),
			height: 60,
			distance: 2,
			name: 'Hard',
		},
	],
});
