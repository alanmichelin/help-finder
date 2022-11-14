import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Service, { Item } from "./Service";
import { acceptServiceRequest, fetchPrestadorById, getRequestsPrestador, rejectServiceRequest,getRequestsUsuario, updateCalificacion, completeServiceRequest } from "../../services/serviceService.js";
import { useEffect, useState, useContext } from "react";
import React from "react";
import Filters from "components/Filters/filters";
import { Grid, IconButton, Paper, styled } from "@mui/material";
import { AuthContext } from "App";
import moment from "moment";
import { Timestamp } from "@firebase/firestore";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Calificate from "./calificate";
import { useNavigate } from "react-router-dom";


const MyServices = () => {
  const [requests, setRequests] = useState([]); // request hechas del lado usuario
  const [requestedBy, setRequestedBy] = useState([]); // request hehcas del lado prestador
  const auth = useContext(AuthContext);
  let navigate = useNavigate();


  const fetchRequestPrestador = async () => {
    const res = await getRequestsPrestador(auth.id.toString());
    setRequestedBy(res);
  };

  const fetchRequestUsuario = async () => {
    const res = await getRequestsUsuario(auth.id.toString());
    setRequests(res);
  };

  const handleCalificationPrestador = async (puntuacion,text,requestId) =>{
    console.log(puntuacion,text,requestId)
    let request = requests.find(x=> x.id === requestId)
    await updateCalificacion(puntuacion,text,request.prestador)
    await completeServiceRequest(requestId)
    navigate(0)
    // window.location.reload();
    
  }
  useEffect(() => {
    if(auth && auth.id){
      if(auth.isPrestador){
        fetchRequestPrestador()
      }
      else{
        fetchRequestUsuario()
      }
    }
  }, [auth]);

  return (
    <Container maxWidth="lg" style={{ paddingTop: "10vh" }}>
      {/* <Filters onApplyFilters={handleApplyFilters} /> */}
      {requestedBy && requestedBy.map((x) => <RequestedByItem request={x} key={x.id} />)}
      {requests && requests.map((x) => <RequestItem request={x} key={x.id} handleCalification={handleCalificationPrestador} />)}
    </Container>
  );
};

const RequestedByItem = ({request}) =>{
  let navigate = useNavigate();
  
  const handleConfirm = async () =>{
    await acceptServiceRequest(request.id)
    setTimeout(()=>{navigate(0)},1500)

  }

  const handleReject = async () =>{
    await rejectServiceRequest(request.id)
    setTimeout(()=>{navigate(0)},1500)

  }
  return(
    <Item style={{height:"160px"}}>
    <Grid container item xs={12}>
      <Grid item xs={10} style={{ textAlign: "left" }}>
        <h2>{request.solicitanteInfo.nombre} solicito tu servicios</h2>
        <p>
          Localidad: {request.solicitanteInfo.location}
        </p>
        <p>Horario: {moment(new Timestamp(request.horario.seconds, request.horario.nanoseconds).toDate()).format("YYYY/MM/DD HH:00")}</p>
        <p>        
        {request.accepted && !request.completed  && `Estado: Aceptada`}
        {request.cancelled && `Estado: Cancelada`}
        {request.completed && request.accepted  && `Estado: Completada`}
        </p>
      </Grid>
      <Grid
        item
        xs={2}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: 'center'
        }}
      >

      {!(request.accepted || (request.cancelled && !request.acepted )) &&
      <>
      <IconButton style={{color:'green', width:'48px', height:'48px'}} onClick={handleConfirm}>
        <CheckIcon />
      </IconButton>
      <IconButton style={{color:'red', width:'48px', height:'48px'}} onClick={handleReject}>
        <CloseIcon />
      </IconButton>
      </>
      }
      </Grid>
    </Grid>
  </Item>
  )
}

const RequestItem = ({request,handleCalification}) =>{
  console.log(request)
  return(
    <Item style={{height:"160px"}}>
    <Grid container item xs={12}>
      <Grid item xs={10} style={{ textAlign: "left" }}>
        <h2>Solicitaste un servicio a {request.prestadorInfo.nombre}</h2>
        <p>
        {!request.accepted && !request.cancelled && `Estado: Pendiente`}
        {request.accepted && !request.completed  && `Estado: Aceptada`}
        {request.cancelled && `Estado: Cancelada`}
        {request.completed && request.accepted  && `Estado: Completada`}
        </p>
        <p>
          Localidad: {request.solicitanteInfo.location}
        </p>
        <p>Horario: {moment(new Timestamp(request.horario.seconds, request.horario.nanoseconds).toDate()).format("YYYY/MM/DD HH:00")}</p>
      </Grid>
      <Grid
        item
        xs={2}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: 'center'
        }}
      >
      {request.accepted && !request.completed  && <Calificate handleCalification={handleCalification} requestId={request.id}/>}
      </Grid>
    </Grid>
  </Item>
  )
}

export default MyServices;
