import { useTable, TableData } from "../../hooks/useTable"
import { GenericForm } from "./GenericForm"
import { GenericTable } from "./GenericTable"
import { GenericNavbar } from "./GenericNavbar"
import { GenericImageCard } from "./GenericImageCard"
import { SERVER_URL } from "../../config"
import { useState } from "react"
import { AssetItem } from "./GenericImageCard"
import "./GenericManager.css"

type FieldType = "text" | "number" | "select"

interface Field {
  name: string
  label: string
  type: FieldType
  options?: string[]
}

interface Props {
  table: string
  formFields: Field[]
  navbarFilters?: {
    navbarField: string
    label: string
    options: string[]
  }[]
  typeFieldForImage?: string
  customAssets?: Record<string, AssetItem>
}

export const GenericManager = ({
  table,
  formFields,
  navbarFilters,
  typeFieldForImage,
  customAssets,
}: Props) => {
  const {
    data,
    loading,
    message,
    selectedItem,
    setSelectedItem,
    setFilters,
    refetch,
  } = useTable(table)

  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState<TableData[] | null>(null)

  const handleSubmit = async (item: TableData) => {
    const isEdit = Boolean(selectedItem)
    const url = isEdit
      ? `${SERVER_URL}/${table}/${item[formFields[0].name]}`
      : `${SERVER_URL}/${table}`
    const method = isEdit ? "PUT" : "POST"

    // est transformación general para todos los campos tipo "number" a tipo "float"
    // porfavor revisar detenidamente en un futuro si se va a guardar edades
    // digamos un cliente juan con 25 años, si se guarda como float, en la db
    // en teoria la db lo deberia guardar como numero
    // PORFAVOR REVISAR MUY BIEN, cualquier error como ese
    // se debe modificar esta logica
    const itemToSend: TableData = {}

    for (const field of formFields) {
      const value = item[field.name]
      if (field.type === "number") {
        itemToSend[field.name] =
          typeof value === "string" ? parseFloat(value) : value
      } else {
        itemToSend[field.name] = value
      }
    }

    console.log("Enviando datos:", itemToSend)

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemToSend),
      })
      await refetch()
      setSelectedItem(null)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (id: string | number) => {
    try {
      await fetch(`${SERVER_URL}/${table}/${id}`, { method: "DELETE" })
      await refetch()
      setSelectedItem(null)
    } catch (error) {
      console.error(error)
    }
  }
  const imageConfig =
    typeFieldForImage && customAssets
      ? {
          key: typeFieldForImage,
          assetMap: customAssets,
          defaultAsset: customAssets["default"],
        }
      : undefined
  return (
    <div className="generic-manager">
      <h2> {table} Management </h2>
      {navbarFilters && (
        <GenericNavbar
          navbarFilters={navbarFilters}
          onFiltersChange={(newFilters) => {
            setFilters(newFilters)
          }}
        />
      )}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tap to search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => {
            const lower = searchTerm.toLowerCase()
            const filtered = data.filter((row) =>
              Object.values(row).some((val) =>
                String(val).toLowerCase().includes(lower)
              )
            )
            setFilteredData(filtered)
          }}
        >
          Search
        </button>
        <button
          onClick={() => {
            setSearchTerm("")
            setFilteredData(null)
          }}
        >
          Clear
        </button>
      </div>

      <div className="form-table-wrapper">
        <div className="form-container">
          <GenericForm
            formFields={formFields}
            initialData={
              selectedItem ||
              Object.fromEntries(
                formFields.map((f) => [
                  f.name,
                  f.type === "select" ? f.options?.[0] ?? "" : "",
                ])
              )
            }
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            onCancel={() => {
              setSelectedItem(null)
              setSelectedRowIndex(null)
            }}
            isEdit={Boolean(selectedItem)}
          />
        </div>
        <div className="image-card-container">
          {" "}
          {imageConfig && (
            <GenericImageCard
              itemType={
                selectedItem
                  ? String(selectedItem[imageConfig.key] ?? "").toLowerCase()
                  : null
              }
              customTypes={imageConfig.assetMap}
              defaultImage={imageConfig.defaultAsset}
            />
          )}
        </div>
        <div className="table-container">
          {loading ? (
            <p>Cargando datos...</p>
          ) : (
            <GenericTable
              data={filteredData || data}
              message={message}
              onRowSelect={(item, index) => {
                setSelectedItem(item)
                setSelectedRowIndex(index)
              }}
              selectedIndex={selectedRowIndex}
              highlight={searchTerm}
            />
          )}
        </div>
      </div>
    </div>
  )
}
