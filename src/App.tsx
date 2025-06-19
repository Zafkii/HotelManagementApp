import Rooms from "./components/RoomsComps/Rooms"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import DynamicBGEffect from "./components/Background/DynamicEffect"

function App() {
  return (
    <>
      {/* <DynamicBGEffect /> */}
      <ToastContainer />
      <Rooms />
    </>
  )
}

export default App
