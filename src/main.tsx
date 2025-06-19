import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./styles/global/main.css"
import "./styles/global/index.css"
import "./styles/global/global.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message)
})
