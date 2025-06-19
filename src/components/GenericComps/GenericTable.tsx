import { TableData } from "../../hooks/useTable"
import "./GenericTable.css"

interface Props {
  data: TableData[]
  message: string
  onRowSelect: (item: TableData, index: number) => void
  selectedIndex: number | null
  highlight?: string
}

export const GenericTable = ({
  data,
  message,
  onRowSelect,
  selectedIndex,
  highlight,
}: Props) => {
  const highlightText = (text: string, highlight?: string) => {
    if (!highlight) return text
    const regex = new RegExp(`(${highlight})`, "gi")
    const parts = text.split(regex)
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={i}>{part}</mark>
      ) : (
        part
      )
    )
  }

  return (
    <div className="generic-table">
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                onClick={() => {
                  onRowSelect(row, index)
                }}
                className={selectedIndex === index ? "selected" : ""}
              >
                {Object.values(row).map((value, i) => (
                  <td key={i}>{highlightText(String(value), highlight)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>{message || "No hay datos disponibles"}</p>
      )}
    </div>
  )
}
