// src/components/GenericNavbar.tsx
import { useState } from "react"
import "./GenericNavbar.css"

interface FilterOption {
  navbarField: string
  label: string
  options: string[]
}

interface Props {
  navbarFilters: FilterOption[]
  onFiltersChange: (navbarFilters: Record<string, string[]>) => void
  onReset?: () => void
}

export const GenericNavbar = ({
  navbarFilters,
  onFiltersChange,
  onReset,
}: Props) => {
  //este estado es para controlar los despegables de los botones del navbar
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({})

  const toggleOption = (navbarField: string, value: string) => {
    const newFilters: Record<string, string[]> = { ...selectedFilters }

    const current = selectedFilters[navbarField] || []
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    newFilters[navbarField] = updated

    setSelectedFilters(newFilters)
    onFiltersChange(newFilters)
  }

  //funcion para controlar los despegables de los botones del navbar
  const toggleDropdown = (navbarField: string) => {
    setOpenDropdown(openDropdown === navbarField ? null : navbarField)
  }

  const resetFilters = () => {
    setSelectedFilters({})
    onFiltersChange({})
    onReset?.()
    setOpenDropdown(null)
  }

  return (
    <nav className="generic-navbar">
      <button className="show-all-button" onClick={resetFilters}>
        Show All
      </button>
      {navbarFilters.map((filter) => (
        <div className="navbar-dropdown" key={filter.navbarField}>
          <button
            className="dropdown-toggle"
            onClick={() => toggleDropdown(filter.navbarField)}
          >
            {filter.label}
          </button>

          {openDropdown === filter.navbarField && (
            <div className="dropdown-content">
              {filter.options.map((opt) => (
                <button
                  key={opt}
                  className={
                    selectedFilters[filter.navbarField]?.includes(opt)
                      ? "active"
                      : ""
                  }
                  onClick={() => toggleOption(filter.navbarField, opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}
