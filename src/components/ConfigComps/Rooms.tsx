import { GenericManager } from "../GenericComps/GenericManager"
import { Assets } from "../../assets/assetsUrl"

const Rooms = () => {
  return (
    <GenericManager
      //aca en TABLE se debe poner el NOMBRE de la TABLA al que llamas en tu BASE DE DATOS
      //la palabra de aca tambien se RENDERIZARA en el componente como TITULO
      //no hay problema si lo pones en MAYUSCULAS alguna letra igual lo encuentra
      table="Rooms"
      // aca en la parte de labels esta para poder cambiar el nombre de las columnas de FORMS
      formFields={[
        { name: "id_room", label: "ID", type: "text" },
        { name: "type", label: "Type", type: "text" },
        { name: "price", label: "Price", type: "number" },
        {
          name: "state",
          label: "State",
          type: "select",
          //combo box
          options: [
            "available",
            "occupied",
            "maintenance",
            "maintenance and occupied",
          ],
        },
      ]}
      //aca esta la parte de filters para poder cambiar los filtros de NAVBAR
      navbarFilters={[
        {
          navbarField: "type",
          label: "Type",
          //aca en options debes poner todos los tipos de habitacion de la BASE DE DATOS
          options: [
            "Budget",
            "Single",
            "Standard",
            "Couple",
            "Twin",
            "Family",
            "Suite",
            "Presidential Suite",
          ],
        },
        {
          navbarField: "state",
          label: "State",
          options: [
            "available",
            "occupied",
            "maintenance",
            "maintenance and occupied",
          ],
        },
      ]}
      //aca en typeFieldForImage se debe poner el nombre del campo de habitacion
      //porque va a renderizar la imagen segun el tipo de habitacion
      typeFieldForImage="type"
      //aca solo poner la ubicacion de las imagenes segun el assetsUrl.ts
      customAssets={Assets.rooms}
    />
  )
}

export default Rooms
