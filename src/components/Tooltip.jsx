const Tooltip = ({ text }) => {
	return (
		<div className="absolute z-50 w-auto p-2 -mt-8 text-xs leading-tight text-white transform -translate-x-1/2 bg-gray-700 rounded-lg shadow-lg">
			{text}
			<svg
				className="absolute left-0 w-full h-2 text-gray-700 top-full"
				viewBox="0 0 255 255">
				<polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
			</svg>
		</div>
	);
};

export default Tooltip;
