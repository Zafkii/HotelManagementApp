import { GenericManager } from "../GenericComps/GenericManager"

const Staff = () => {
  return (
    <GenericManager
      table="Staff"
      formFields={[
        { name: "ci", label: "CI", type: "number" },
        { name: "first_names", label: "First Names", type: "text" },
        { name: "last_names", label: "Last Names", type: "text" },
        {
          name: "department",
          label: "Department",
          type: "select",
          options: [
            "cleaning",
            "reception",
            "manager",
            "inventory",
            "other",
            "maintenance",
          ],
        },
        { name: "email", label: "Email", type: "text" },
        { name: "phone", label: "Phone", type: "text" },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: ["active", "inactive", "on leave"],
        },
        { name: "end_date", label: "End Date", type: "text" },
        { name: "role", label: "Role", type: "text" },
      ]}
      navbarFilters={[
        {
          navbarField: "department",
          label: "Department",
          options: [
            "cleaning",
            "reception",
            "manager",
            "inventory",
            "other",
            "maintenance",
          ],
        },
        {
          navbarField: "status",
          label: "Status",
          options: ["active", "inactive", "on leave"],
        },
      ]}
    />
  )
}

export default Staff
