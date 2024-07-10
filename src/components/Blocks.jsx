import { Draggable } from "react-beautiful-dnd"

const Block = ({ block, index }) => (
  <Draggable draggableId={block.id} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="block"
      >
        {block.type}
      </div>
    )}
  </Draggable>
);

export default function Blocks() {
  return (
    <div className="left-panel">
      
    </div>
  )
}