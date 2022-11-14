import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Container from "@mui/material/Container";
import MessagePopup from "components/MessagePopup.jsx";
import React, { useContext, useEffect, useState } from "react";
import { addService, getDataFromGeolocation } from "services/serviceService.js";
import { AuthContext, ConfigContext } from "../../App.jsx";
import { Timestamp, GeoPoint } from "@firebase/firestore";

const NewService = () => {
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });
  const [inputServicio, setInputServicio] = useState("CUALQUIERA");
  const [inputProximidad, setInputProximidad] = useState("");
  const [servicios, setServicios] = useState([]);
  const [location, setLocation] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [mensaje,setMensaje] = useState(null)
  const config = useContext(ConfigContext);
  const auth = useContext(AuthContext);

  let newService = {
    descripcion: "",
    precio: 0,
    prestador: {
      id: auth?.id,
      nombre: auth?.displayName,
    },
    tipo: "",
    coords: coords, 
    location: location,
    createdDate: Timestamp.fromDate(new Date())
  };

  // useEffect(()=>{
  //   if(auth !== null)
  //   {

  //     }
  //   }
  // },[auth])

  const handleForm = (event) => {
    if (event.target.type == "number")
      newService[event.target.name] = parseInt(event.target.value);
    else newService[event.target.name] = event.target.value;
  };
  useEffect(() => {
    setServicios(config["tipo_servicios"]);
  }, [config]);

  useEffect(() => {
    newService["tipo"] = inputServicio;
  }, [inputServicio]);

  const successCallback = async (position) => {
    console.log(position);
    console.log(auth);
    setCoords(new GeoPoint(position.coords.latitude, position.coords.longitude));
    const data = await getDataFromGeolocation(
      position.coords.latitude,
      position.coords.longitude
    );
    setLocation(data.results[4].formatted_address);
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  useEffect(()=>{
    if(mensaje){
      setTimeout(()=>{setMensaje(null)},3000)
    }
  },[mensaje])

  const handleServiceDropdown = (event) => {
    setInputServicio(event.target.value);
  };

  const handleSubmit = async () => {
    if (
      newService.descripcion !== "" &&
      newService.precio !== 0 &&
      newService.tipo !== ""
    ) {
      addService(newService);
      setMensaje(
        <MessagePopup
          type={"success"}
          message={
            "Su servicio fue agregado correctamente. Seras rediccionado en 5 segundos"
          }
        />
      );
    } else{
      setMensaje(
        <MessagePopup
          type={"error"}
          message={
            "Favor de llenar correctamente la informacion, faltan datos."
          }
        />
      );
    }

    setIsMessage(true);
  };


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);
  return (
    <Container maxWidth="sm" style={{ paddingTop: "10vh" }}>
      {mensaje!== null && mensaje}
      <FormControl fullWidth>
        <span>Agregar un servicio</span>
        <Select
          name="tipo"
          value={inputServicio}
          defaultValue={inputServicio}
          onChange={handleServiceDropdown}
          required
        >
          {servicios &&
            servicios.map((servicio) => {
              return (
                <MenuItem value={servicio} key={servicio}>
                  {servicio}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <span>Descripcion:</span>
        <Input name="descripcion" onChange={handleForm} required />
      </FormControl>
      <FormControl fullWidth>
        <span>Precio</span>
        <Input name="precio" onChange={handleForm} type="number" />
      </FormControl>
      <FormControl fullWidth>
        <span>Prestador:</span>
        <Input disabled value={auth?.name || ""} />
      </FormControl>
      <Button onClick={handleSubmit}>Agregar</Button>
    </Container>
  );
};

export default NewService;
