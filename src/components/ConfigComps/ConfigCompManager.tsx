import { useState } from "react"
import Rooms from "./Rooms"
import Clients from "./Clients"
import "./ConfigCompManager.css"

type FrameView =
  | "Rooms"
  | "Clients"
  | "Employees"
  | "Services"
  | "Reservations"
  | "Payments"

const ConfigCompManager = () => {
  const [frameView, setFrameView] = useState<FrameView>("Rooms")

  const renderView = () => {
    switch (frameView) {
      case "Rooms":
        return <Rooms />
      case "Clients":
        return <Clients />
      default:
        return <div>Selecciona una vista</div>
    }
  }

  return (
    <div className="config-comp-manager">
      {/* Navbar */}
      <nav className="general-navbar">
        <div className="general-nav-buttons">
          <div className="logo">🛎️ HotelApp</div>
          <button onClick={() => setFrameView("Rooms")}>Rooms</button>
          <button onClick={() => setFrameView("Clients")}>Clients</button>
          <button onClick={() => setFrameView("Employees")}>Employees</button>
          <button onClick={() => setFrameView("Services")}>Services</button>
          <button onClick={() => setFrameView("Reservations")}>
            Reservations
          </button>
          <button onClick={() => setFrameView("Payments")}>Payments</button>
        </div>
      </nav>

      {/* Componente dinámico */}
      <> {renderView()}</>
    </div>
  )
}

export default ConfigCompManager
