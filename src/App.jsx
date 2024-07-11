import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const initialBlocks = [
  { id: 'Warm Up', value: 20, bars: [20], distance: 2 },
  { id: 'Active', value: 80, bars: [80], distance: 2 },
  { id: 'TwoStepRepeats', value: 75, bars: [40,60], distance: 2 },
  { id: 'CoolDown', value: 50, bars: [50],  distance: 2 },
  { id: 'RampUp', value: 90, bars: [50, 60, 70, 80],  distance: 2 },
  { id: 'RampDown', value: 100, bars: [80, 70, 60, 50],  distance: 2},

];

const App = () => {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [graphData, setGraphData] = useState([]);
  const [animateIndex, setAnimateIndex] = useState(null);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    // If dropped in the same list, reorder the blocks
    if (source.droppableId === 'blocks' && destination.droppableId === 'blocks') {
      const items = Array.from(blocks);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setBlocks(items);
      return;
    }

    // If dropped in the graph area
    if (source.droppableId === 'blocks' && destination.droppableId === 'graph') {
      const draggedBlock = blocks[source.index];
      setGraphData((prevData) => {
        const newData = [
          ...prevData,
          {
            id: `group-${prevData.length + 1}`,
            bars: draggedBlock.bars,
            distance: draggedBlock.distance,
          },
        ];
        setAnimateIndex(newData.length - 1);
        return newData;
      });
    }
  };

  const clearGraph = () => {
    setGraphData([]);
  };

  const formattedGraphData = graphData.flatMap((group, groupIndex) => 
    group.bars.map((bar, barIndex) => ({
      name: `${group.distance}`,
      value: bar,
      groupIndex,
      animate: groupIndex === animateIndex,
    }))
  );

  const CustomizedTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const groupIndex = payload[0].payload.groupIndex;
      const group = graphData[groupIndex];

      return (
        <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
          <p className="label">{`Group ${groupIndex + 1}`}</p>
          <ul>
            {group.bars.map((bar, index) => (
              <li key={index}>{`Bar ${index + 1}: ${bar}`}</li>
            ))}
          </ul>
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '1rem' }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ width: '25%', padding: '1rem', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>Click or drag the blocks to build workout</h3>
          <Droppable droppableId="blocks">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {blocks.map((block, index) => (
                  <Draggable key={block.id} draggableId={block.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: 'none',
                          padding: '0.5rem',
                          margin: '0 0 0.5rem 0',
                          backgroundColor: 'white',
                          color: 'white',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'row',
                          height: '100px',
                          width: 'fit-content',
                          ...provided.draggableProps.style,
                        }}
                      >
                        {block.bars.map((bar, i) => (
                          <div className='flex flex-col-reverse'>
                          <div key={i} style={{ height: `${bar}%`, width: '50px', background: 'rgba(137, 110, 255, 0.7)', margin: '2px 2px' }}></div>
                          </div>
                        ))}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div style={{ width: '70%', padding: '1rem', background: '#fff', borderRadius: '8px' }}>
          <button onClick={clearGraph} style={{ marginBottom: '1rem' }}>Clear Blocks</button>
          <Droppable droppableId="graph">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: '300px' }}>
                <BarChart
                  width={800}
                  height={300}
                  data={formattedGraphData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barCategoryGap="50%"
                  barSize={20}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]}/>
                  <Tooltip content={<CustomizedTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="value"
                    fill="rgba(137, 110, 255, 0.7)"
                    className={({ payload }) => (payload.animate ? 'bar-slide-in' : '')}
                  />
                </BarChart>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
