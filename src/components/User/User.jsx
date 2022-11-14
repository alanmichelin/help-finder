import { Checkbox, Container, Grid, Paper, Rating, styled } from "@mui/material";
import { AuthContext } from "App";
import Filters from "components/Filters/filters";
import Maps from "components/Map/map";
import moment from "moment";
import React, { useContext, useState, useEffect } from "react";
import {
  
  fetchPrestadorById,
  fetchServices,
  setPrestador,
} from "services/serviceService";
import { ServiceSchedule } from "../Services/serviceSchedule";
import { UserServices } from "./userServices";
import { Timestamp } from "@firebase/firestore";

const User = () => {
  const user = useContext(AuthContext);
  const [busyDates, setBusyDates] = useState();
  const [services, setServices] = useState();
  const [isChecked, setIsChecked] = useState(false)
  const [currentUser,setCurrentUser] = useState()
  useEffect(() => {
    if (user && user.id) {
      setIsChecked(user?.isPrestador || false)
      setCurrentUser(user)
      console.log(user)
    }
  }, [user]);

  useEffect(() => {
    console.log(busyDates);
  }, [busyDates]);

  useEffect(()=>{
  },[isChecked])

  const handlePrestadorChange = () =>{
    setPrestador(user.id, !isChecked)
    setIsChecked(!isChecked)
  }
  const _fetchServices = async () => {
    const _services = await fetchServices();
    console.log(_services);
    setServices(_services);
  };

  useEffect(() => {
    console.log(services);
    _fetchServices();
  }, []);


  return (
    currentUser && (
      <Container maxWidth="lg" style={{ paddingTop: "10vh" }}>
        <h1>{currentUser.displayName} <Rating value={currentUser.promedio}/> </h1>
        <h2>Cantidad de calificaciones: {currentUser.cantPuntuaciones} </h2>
        <p>Ser prestador<Checkbox checked={isChecked} onChange={handlePrestadorChange}></Checkbox></p>
        <div style={{display:'flex', flexDirection:'column',alignItems: 'center'}}>
        <img src={user.photoURL} alt="" style={{ width: "200px" }} />
        <Grid container item xs={12}>
        {currentUser.calificaciones && currentUser.calificaciones.map((x) => {

      return <Grid item xs={3} style={{marginRight:'60px'}}>
       <Item>
      <Grid container item xs={12} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <p>{moment(new Timestamp(x.fecha._seconds, x.fecha._nanoseconds).toDate()).format("YYYY/MM/DD")}</p>
          <p>Puntuacion: {x.puntuacion}</p>
          <p>Comentarios: {x.comentario}</p>
      </Grid>
      </Item>
      </Grid>
      
      })}
        </Grid>
        {/* <Maps /> */}
        </div>
      </Container>
    )
  );
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: '15px',
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "130px",
  marginTop: "15px",
  width:'100%'
}));

export default User;
