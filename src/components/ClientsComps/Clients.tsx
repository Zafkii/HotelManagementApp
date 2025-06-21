import { GenericManager } from "../GenericComps/GenericManager"

const Clients = () => {
  return (
    <GenericManager
      table="Clients"
      formFields={[
        { name: "ci_client", label: "CI", type: "number" },
        { name: "first_names", label: "First Names", type: "text" },
        { name: "last_names", label: "Last Names", type: "text" },
        { name: "phone", label: "Phone", type: "text" },
        { name: "email", label: "Email", type: "text" },
      ]}
    />
  )
}

export default Clients
