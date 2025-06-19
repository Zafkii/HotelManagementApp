import { useState, useEffect, useCallback } from "react"
import { SERVER_URL } from "../../src/config"

export interface TableData {
  [key: string]: string | number
}

export const useTable = (tableName: string) => {
  const [data, setData] = useState<TableData[]>([])
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState<TableData | null>(null)
  const [filters, setFilters] = useState<Record<string, string[]>>({})

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams()
      for (const key in filters) {
        const values = filters[key]
        values.forEach((val) => {
          queryParams.append(key, val)
        })
      }

      const response = await fetch(
        `${SERVER_URL}/${tableName}?${queryParams.toString()}`
      )
      if (!response.ok) throw new Error("Error al obtener los datos")
      const result = await response.json()
      setData(result)
      setMessage("")
    } catch (error) {
      console.error(error)
      setMessage("Error al cargar los datos")
    } finally {
      setLoading(false)
    }
  }, [tableName, filters])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    message,
    selectedItem,
    setSelectedItem,
    setFilters,
    refetch: fetchData,
  }
}
