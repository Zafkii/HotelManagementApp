import { useEffect, useState } from "react"
import "./Reservations.css"

interface Client {
  ci_client: number
  first_names: string
  last_names: string
}

interface Room {
  id_room: string
  type: string
  price: number
  state: string
}

interface ReservationRoom {
  id_room: string
  booked_nights: number
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL

const Reservations = () => {
  const [clients, setClients] = useState<Client[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [selectedClient, setSelectedClient] = useState("")
  const [roomSelections, setRoomSelections] = useState<ReservationRoom[]>([
    { id_room: "", booked_nights: 1 },
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetch(`${SERVER_URL}/clients`)
      .then((res) => res.json())
      .then(setClients)

    fetch(`${SERVER_URL}/rooms`)
      .then((res) => res.json())
      .then(setRooms)
  }, [])

  const handleSubmit = async () => {
    if (!selectedClient || roomSelections.length === 0) {
      alert("Select a client and at least one room to book.")
      return
    }

    setIsSubmitting(true)
    try {
      // 1. Registrar reservación del cliente
      const clientRes = await fetch(`${SERVER_URL}/reservations/client`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ci_client: Number(selectedClient) }),
      })
      const clientData = await clientRes.json()

      const serial_by_client = Number(clientData.serial_by_client)
      if (!serial_by_client)
        throw new Error(
          "It was not possible to register the client reservation."
        )

      // 2. Registrar habitaciones reservadas
      for (const room of roomSelections) {
        if (!room.id_room || room.booked_nights < 1) {
          console.warn("Detected Invalid Room: ", room)
          continue
        }

        const res = await fetch(`${SERVER_URL}/reservations/room`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            serial_by_client,
            id_room: room.id_room,
            booked_nights: room.booked_nights,
          }),
        })

        if (!res.ok) {
          const errorText = await res.text()
          console.error(`Error registering Room ${room.id_room}:`, errorText)
        }
      }

      alert("Successfully registered the reservation!")
      setSelectedClient("")
      setRoomSelections([{ id_room: "", booked_nights: 1 }])
    } catch (err) {
      alert("An error occurred while registering the reservation.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="reservations-container">
      <h2 className="reservations-title">Regiter Reservation</h2>
      <label className="form-label">Select Client:</label>
      <select
        value={selectedClient}
        onChange={(e) => setSelectedClient(e.target.value)}
        className="form-select"
      >
        <option value="">-- Select a Client --</option>
        {clients.map((client) => (
          <option key={client.ci_client} value={client.ci_client}>
            {client.first_names} {client.last_names} ({client.ci_client})
          </option>
        ))}
      </select>

      <h3 className="room-section-title">Rooms to booked and its nights:</h3>
      {roomSelections.map((room, index) => (
        <div key={index} className="room-selection">
          <select
            value={room.id_room}
            onChange={(e) => {
              const updated = [...roomSelections]
              updated[index].id_room = e.target.value
              setRoomSelections(updated)
            }}
            className="room-select"
          >
            <option value="">-- Room --</option>
            {rooms.map((r) => (
              <option key={r.id_room} value={r.id_room}>
                {r.id_room} ({r.type})
              </option>
            ))}
          </select>

          <input
            type="number"
            min={1}
            value={room.booked_nights}
            onChange={(e) => {
              const updated = [...roomSelections]
              updated[index].booked_nights = Number(e.target.value)
              setRoomSelections(updated)
            }}
            className="nights-input"
            placeholder="Noches"
          />

          <button
            onClick={() =>
              setRoomSelections((prev) => prev.filter((_, i) => i !== index))
            }
            className="delete-room-btn"
          >
            Delete
          </button>
        </div>
      ))}

      <button
        onClick={() =>
          setRoomSelections((prev) => [
            ...prev,
            { id_room: "", booked_nights: 1 },
          ])
        }
        className="add-room-btn"
      >
        Add Room
      </button>

      <br />

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="submit-btn"
      >
        {isSubmitting ? "Registrando..." : "Registrar Reservación"}
      </button>
    </div>
  )
}

export default Reservations
