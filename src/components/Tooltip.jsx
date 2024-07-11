// Tooltip.js
import React from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({ text, children }) => {
  return (
    <div className="relative inline-block">
      {children}
      <div className="tooltip text-white bg-black p-1 rounded-lg shadow-lg absolute bottom-full left-1/2 transform -translate-x-1/2 opacity-0 invisible transition-opacity duration-200">
        {text}
        <svg className="absolute text-black h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xml:space="preserve">
          <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
        </svg>
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Tooltip;
