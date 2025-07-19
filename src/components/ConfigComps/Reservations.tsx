import { useEffect, useState } from "react"

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
      alert("Selecciona un cliente y al menos una habitación")
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
      if (!serial_by_client) throw new Error("No se pudo crear la reservación")

      // 2. Registrar habitaciones reservadas
      for (const room of roomSelections) {
        if (!room.id_room || room.booked_nights < 1) {
          console.warn("Habitación inválida detectada:", room)
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
          console.error(
            `Error al reservar habitación ${room.id_room}:`,
            errorText
          )
        }
      }

      alert("Reservación registrada correctamente.")
      setSelectedClient("")
      setRoomSelections([{ id_room: "", booked_nights: 1 }])
    } catch (err) {
      alert("Ocurrió un error al registrar la reservación.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Registrar Reservación</h2>

      <label className="block mb-2">Seleccionar cliente:</label>
      <select
        value={selectedClient}
        onChange={(e) => setSelectedClient(e.target.value)}
        className="border p-2 mb-4 w-full"
      >
        <option value="">-- Selecciona un cliente --</option>
        {clients.map((client) => (
          <option key={client.ci_client} value={client.ci_client}>
            {client.first_names} {client.last_names} ({client.ci_client})
          </option>
        ))}
      </select>

      <h3 className="font-semibold mb-2">Habitaciones a reservar:</h3>
      {roomSelections.map((room, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <select
            value={room.id_room}
            onChange={(e) => {
              const updated = [...roomSelections]
              updated[index].id_room = e.target.value
              setRoomSelections(updated)
            }}
            className="border p-2"
          >
            <option value="">-- Habitación --</option>
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
            className="border p-2 w-24"
            placeholder="Noches"
          />

          <button
            onClick={() =>
              setRoomSelections((prev) => prev.filter((_, i) => i !== index))
            }
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Eliminar
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
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Añadir habitación
      </button>

      <br />

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {isSubmitting ? "Registrando..." : "Registrar Reservación"}
      </button>
    </div>
  )
}

export default Reservations
