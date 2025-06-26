import { useEffect, useState } from "react"
import { TableData } from "../../hooks/useTable"
import "./GenericForm.css"

type FieldType = "text" | "number" | "select"

interface FormField {
  name: string
  label: string
  type: FieldType
  options?: string[]
}

interface Props {
  formFields: FormField[]
  initialData: TableData
  onSubmit: (data: TableData) => void
  onDelete?: (id: string | number) => void
  onCancel: () => void
  isEdit: boolean
}

export const GenericForm = ({
  formFields,
  initialData,
  onSubmit,
  onDelete,
  onCancel,
  isEdit,
}: Props) => {
  const [formData, setFormData] = useState<TableData>(initialData)

  useEffect(() => {
    setFormData(initialData)
  }, [initialData])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const parsedValue = type === "number" ? Number(value) : value
    setFormData((prev) => ({ ...prev, [name]: parsedValue }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="generic-form">
      {formFields.map((formField) => (
        <div key={formField.name}>
          <label>{formField.label}</label>
          {formField.type === "select" ? (
            <select
              name={formField.name}
              value={String(formData[formField.name] || "")}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>
                -- Select an option --
              </option>
              {formField.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={formField.type}
              name={formField.name}
              value={String(formData[formField.name] || "")}
              onChange={handleChange}
            />
          )}
        </div>
      ))}
      <div className="form-buttons">
        <button type="submit">{isEdit ? "Update" : "Add"}</button>
        {isEdit && onDelete && (
          <button
            type="button"
            onClick={() => onDelete(formData[formFields[0].name])}
          >
            Delete
          </button>
        )}
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}
