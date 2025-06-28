import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "react-confirm-alert/src/react-confirm-alert.css"
// import DynamicBGEffect from "./components/Background/DynamicEffect"
import ConfigCompManager from "./components/ConfigComps/ConfigCompManager"

function App() {
  return (
    <>
      {/* <DynamicBGEffect /> */}
      <ToastContainer />
      <ConfigCompManager />
    </>
  )
}

export default App
