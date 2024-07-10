import './App.css'
import DropableGraph from './components/DropableGraph'
import Header from './components/header'
import Blocks from './components/Blocks'
import WarmUp from './components/Warmup'
import { DragDropContext } from 'react-beautiful-dnd'
function App() {
  let onDragEnd = () => {

  }
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="flex w-full justify-center">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="left-panel">
            <Blocks />
          </div>
          <div className="right-panel">
          <DropableGraph/>
          </div>
        </DragDropContext>
      </div>
    </div>
  )
}

export default App
