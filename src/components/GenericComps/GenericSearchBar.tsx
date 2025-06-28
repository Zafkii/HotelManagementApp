import "./GenericSearchBar.css"
interface GenericSearchBarProps<
  TableData extends Record<string, string | number>
> {
  data: TableData[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  onSearch: (filteredData: TableData[] | null, searchTerm: string) => void
}

export const GenericSearchBar = <
  TableData extends Record<string, string | number>
>({
  data,
  searchTerm,
  setSearchTerm,
  onSearch,
}: GenericSearchBarProps<TableData>) => {
  const handleSearch = () => {
    const lower = searchTerm.toLowerCase()
    const filtered = data.filter((row) =>
      (Object.values(row) as Array<string | number>).some((val) =>
        String(val).toLowerCase().includes(lower)
      )
    )
    onSearch(filtered, searchTerm)
  }

  const handleClear = () => {
    setSearchTerm("")
    onSearch(null, "")
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Tap to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // 👈 resalta en tiempo real
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleClear}>Clear</button>
    </div>
  )
}
