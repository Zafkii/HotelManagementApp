import { GenericManager } from "../GenericComps/GenericManager"
import { Assets } from "../../assets/assetsUrl"

const MaintenanceTasks = () => {
  return (
    <GenericManager
      table="maintenance_tasks"
      formFields={[
        { name: "id", label: "ID", type: "number" },
        { name: "room_id", label: "Room ID", type: "text" },
        {
          name: "state",
          label: "State",
          type: "select",
          options: [
            "notified",
            "received",
            "in progress",
            "work completed",
            "cancelled",
          ],
        },
        {
          name: "reason",
          label: "Reason",
          type: "select",
          options: [
            "maintenance",
            "being cleaned",
            "out of service",
            "inspection",
            "repair",
          ],
        },
        { name: "motive", label: "Motive", type: "text" },
        {
          name: "staff_in_charge",
          label: "Staff in Charge (JSON)",
          type: "text",
        },
        {
          name: "estimated_duration",
          label: "Estimated Duration (hh:mm:ss)",
          type: "text",
        },
        { name: "end_time", label: "End Time (optional)", type: "text" },
        { name: "created_by", label: "Created By (Staff ID)", type: "number" },
      ]}
      navbarFilters={[
        {
          navbarField: "state",
          label: "State",
          options: [
            "notified",
            "received",
            "in progress",
            "work completed",
            "cancelled",
          ],
        },
        {
          navbarField: "reason",
          label: "Reason",
          options: [
            "maintenance",
            "being cleaned",
            "out of service",
            "inspection",
            "repair",
          ],
        },
      ]}
      typeFieldForImage="reason"
      customAssets={Assets.maintenance}
    />
  )
}

export default MaintenanceTasks
