const NodeOnGraph = ({ node }) => {
	return (
		<div className="flex space-x-1 items-end w-full ">
			<div className="flex space-x-1 items-end item mx-1 w-full">
				{node.distances.map((item, index) => (
					<div
						className="bg-blue-500"
						style={{
							height: `${(item.height / 100) * 14}rem`,
							width: `${item.distance * 100}%`,
						}}
						key={index}></div>
				))}
			</div>
		</div>
	);
};
export default NodeOnGraph;
