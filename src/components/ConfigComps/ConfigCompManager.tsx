import { useState } from "react"
import Rooms from "./Rooms"
import Clients from "./Clients"
import ScrollableNavbar from "./ScrollableNavbar"
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
      <ScrollableNavbar className="general-navbar">
        <div className="logo-hotel">🛎️</div>
        <button onClick={() => setFrameView("Rooms")}>Rooms</button>
        <button onClick={() => setFrameView("Clients")}>Clients</button>
        <button onClick={() => setFrameView("Employees")}>Employees</button>
        <button onClick={() => setFrameView("Services")}>Services</button>
        <button onClick={() => setFrameView("Reservations")}>
          Reservations
        </button>
        <button onClick={() => setFrameView("Payments")}>Payments</button>
      </ScrollableNavbar>

      {/* Componente dinámico */}
      <> {renderView()}</>
    </div>
  )
}

export default ConfigCompManager
