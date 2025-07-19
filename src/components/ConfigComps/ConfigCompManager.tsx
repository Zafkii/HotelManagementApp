import { useState } from "react"
import Rooms from "./Rooms"
import Clients from "./Clients"
import Reservations from "./Reservations"
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const renderView = () => {
    switch (frameView) {
      case "Rooms":
        return <Rooms />
      case "Clients":
        return <Clients />
      case "Reservations":
        return <Reservations />
      default:
        return <div>Selecciona una vista</div>
    }
  }

  const handleNavigation = (view: FrameView) => {
    setFrameView(view)
    setMobileMenuOpen(false) // cerrar el menú en móvil
  }

  return (
    <div className="config-comp-manager">
      <nav className="general-navbar">
        <div className="navbar-logo">🛎️</div>

        {/* Botón menú hamburguesa */}
        <button
          className="hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>

        {/* Menú horizontal para escritorio */}
        <div className="nav-buttons desktop-only">
          <button onClick={() => handleNavigation("Rooms")}>Rooms</button>
          <button onClick={() => handleNavigation("Clients")}>Clients</button>
          <button onClick={() => handleNavigation("Employees")}>
            Employees
          </button>
          <button onClick={() => handleNavigation("Services")}>Services</button>
          <button onClick={() => handleNavigation("Reservations")}>
            Reservations
          </button>
          <button onClick={() => handleNavigation("Payments")}>Payments</button>
        </div>

        {/* Menú vertical sobrepuesto para móvil */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <button onClick={() => handleNavigation("Rooms")}>Rooms</button>
            <button onClick={() => handleNavigation("Clients")}>Clients</button>
            <button onClick={() => handleNavigation("Employees")}>
              Employees
            </button>
            <button onClick={() => handleNavigation("Services")}>
              Services
            </button>
            <button onClick={() => handleNavigation("Reservations")}>
              Reservations
            </button>
            <button onClick={() => handleNavigation("Payments")}>
              Payments
            </button>
          </div>
        )}
      </nav>

      {/* Vista seleccionada */}
      <div className="view-container">{renderView()}</div>
    </div>
  )
}

export default ConfigCompManager
