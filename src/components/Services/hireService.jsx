import { Container, Grid } from "@mui/material";
import moment from "moment";
import * as React from "react";
import Timetable from "react-timetable-events";
import ServiceSchedule from "./serviceSchedule";
import SelectTime from "./serviceTimeSelect.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addServiceRequest, fetchPrestadorById, fetchService, getDataFromGeolocation, getRequestsPrestador } from "services/serviceService";
import { AuthContext } from "App";
import { Timestamp, GeoPoint } from "@firebase/firestore";
export const HireService = () => {
  const [service, setService] = useState({
    nombre: "",
    prestador: { nombre: "", id: 0 },
    precio: "",
    descripcion: "",
  });
  const user = React.useContext(AuthContext);

  let busyDatesMock = [
    "2022-10-24T13:16:51-03:00",
    "2022-10-25T10:16:51-03:00",
    "2022-10-25T13:16:51-03:00",
    "2022-10-25T15:16:51-03:00",
  ];

  const [busyDates, setBusyDates] = useState();
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });
  const [location,setLocation] = useState('')

  let { id } = useParams();
  const _fetchService = async () => {
    const _service = await fetchService(id);
    setService(_service);
  };

  const successCallback = async (position) => {
    const data = await getDataFromGeolocation(position.coords.latitude,position.coords.longitude )
    setLocation(data.results[4].formatted_address)
    setCoords(new GeoPoint(position.coords.latitude, position.coords.longitude));
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }
  ,[])
  const _fetchPrestador = async () => {
    console.log(service.prestador.id);
    const _prestadorRequests = await getRequestsPrestador(
      service.prestador.id.toString()
    );

    const horarios = []


    _prestadorRequests.forEach(x => {
        if(x.accepted)
          horarios.push(moment(new Timestamp(x.horario.seconds, x.horario.nanoseconds).toDate()).format())
      })
    
    console.log(horarios)
    setBusyDates(horarios);
    // setBusyDates(_busyDates);
  };
  useEffect(() => {
    _fetchService();
  }, [id]);

  useEffect(() => {
    if (service.prestador.id !== 0) {
      _fetchPrestador();
    }
  }, [service]);

  const handleConfirmService = (day, selectedHour) => {
    console.log(day,selectedHour)
    let parsedDate = day.split(" ")[1].split("/");
    let horario = moment(moment(
        `${moment().year()}-${parsedDate[0]}-${
          parsedDate[1]
        }T${selectedHour}:00:00-03:00`).format()).toDate()

    var serviceRequestData = {
      serviceId: id,
      prestador: service.prestador.id.toString(),
      solicitante: user.id.toString(),
      horario: Timestamp.fromDate(horario),
      completed: false,
      cancelled: false,
      accepted: false,
      isQualified: false,
      prestadorInfo:{
        nombre: service.prestador.nombre
      },
      solicitanteInfo:{
        nombre: user.displayName,
        id:user.id.toString(),
        coords: coords,
        location:location
      },
    };
    console.log(serviceRequestData)
    addServiceRequest(serviceRequestData)
  };


  return (
    <Container maxWidth="lg" style={{ paddingTop: "10vh" }}>
      <h1>Contratar un servicio</h1>
      <Grid container item xs={12}>
        <Grid item xs={10} style={{ textAlign: "left" }}>
          <h2>{service.tipo}</h2>
          <h3>{service.descripcion}</h3>
          <p>
            Prestador: {service.prestador.nombre} | Precio por hora: $
            {service.precio}
          </p>
        </Grid>
      </Grid>
      <ServiceSchedule busyDates={busyDates} />
      <Grid container style={{ marginTop: "25px" }}>
        <Grid item xs={4}>
          <SelectTime
            busyDates={busyDates}
            handleConfirmService={handleConfirmService}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HireService;

