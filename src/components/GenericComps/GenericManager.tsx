import { useTable, TableData } from "../../hooks/useTable"
import { GenericForm } from "./GenericForm"
import { GenericTable } from "./GenericTable"
import { GenericNavbar } from "./GenericNavbar"
import { GenericImageCard } from "./GenericImageCard"
import { GenericSearchBar } from "./GenericSearchBar"
import { SERVER_URL } from "../../config"
import { useState } from "react"
import { AssetItem } from "./GenericImageCard"
import "./GenericManager.css"
import { toast } from "react-toastify"
import { confirmAlert } from "react-confirm-alert"

//estos van a ser los tipos permitidos para todos los campos del formulario
type FieldType = "text" | "number" | "select"

//tipado unico en las tablas
interface Field {
  name: string
  label: string
  type: FieldType
  options?: string[] //esta parte es opcional y solo seria para los campos tipo "select"
}

//props que recibe este componente
interface Props {
  table: string //nombre de la db tabla
  formFields: Field[] //campos del formulario
  navbarFilters?: {
    navbarField: string
    label: string
    options: string[]
  }[] //filtros "opcionales" para la navbar (por ejemplo la tabla rooms tiene tipos, y clientes no asi que esto no se mostraria), los tipos son configurables en la configuracion del componente en ConfigComps por ejemplo si a clientes le agrego un campo "direccion" y lo quiero filtrar, lo agrego aqui
  typeFieldForImage?: string // nombre del campo que determina el tipo de imagen o gif qu se va amostrar
  customAssets?: Record<string, AssetItem> //las imagenes o gifs
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

  // estado para resaltar la fila seleccionada
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null)

  // estados para la barra de busqueda
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState<TableData[] | null>(null)

  //funcion para el envio de datos del form
  const handleSubmit = async (item: TableData) => {
    const isEdit = Boolean(selectedItem)

    // construyendo el endpoint URL, si es registro nuevo o edicion
    const url = isEdit
      ? `${SERVER_URL}/${table}/${item[formFields[0].name]}`
      : `${SERVER_URL}/${table}`
    const method = isEdit ? "PUT" : "POST"

    // Se transforma el objeto item a itemToSend para asegurar que los campos tipo número se conviertan a floa (WARNING POINT)
    //revisar esta logica si realmente es necesaria, ya que si el campo es de tipo "number" pero va a la db con campo de edad y que solo registra numeros enteros, no deberia ser necesario pero incluso talvez tendra que ser corregido
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

    console.log("Sending datos:", itemToSend)
    //ENVIO de datos
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemToSend),
      })
      const result = await response.json()
      if (!response.ok) {
        if (response.status === 404) {
          toast.error(`${result.error}, Are you trying to modify the id?`)
        } else if (response.status === 400) {
          toast.error(
            result.error || "Error: Bad request. Please check your data."
          )
        } else {
          toast.error("Error: An unexpected error occurred.")
        }
        return
      }
      await refetch() //refresca los datos de la tabla
      setSelectedItem(null) //limpia el item seleccionado
      toast.success(
        isEdit ? "Updated Record Succesfully" : "Created Record Succesfully"
      )
    } catch (error) {
      toast.error("Unexpected error occurred in the server")
      console.error("Error sending data to server:", error)
    }
  }

  //ELIMINACION de datos
  const handleDelete = async (id: string | number) => {
    confirmAlert({
      title: "Confirm deletion",
      message: "Are you sure you want to delete this record?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await fetch(`${SERVER_URL}/${table}/${id}`, { method: "DELETE" })
              await refetch()
              setSelectedItem(null)
              toast.success("Registro eliminado correctamente")
            } catch (error) {
              toast.error("Error al eliminar el registro")
              console.error(error)
            }
          },
        },
        {
          label: "No",
          onClick: () => {
            toast.info("Canceled deletion")
          },
        },
      ],
    })
  }
  //configuracion de imagenes correspondientes al tipo que se le configura
  const imageConfig =
    typeFieldForImage && customAssets
      ? {
          key: typeFieldForImage,
          assetMap: customAssets,
          defaultAsset: customAssets["default"],
        }
      : undefined

  // Componente principal que renderiza el manager
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

      <GenericSearchBar<TableData>
        data={data}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={(filtered) => {
          setFilteredData(filtered)
        }}
      />

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
