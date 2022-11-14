import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: '15px',
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "300px",
  marginTop: "15px",
  width:'100%'
}));

const Service = ({ service }) => {
  const navigate = useNavigate();
  return (
    <Item>
      <Grid container item xs={12}>
        <Grid item xs={12} style={{ textAlign: "left" }}>
          <h2 style={{textAlign:'center'}}>{service.tipo}</h2>
          <p>
            Prestador: {service.prestador.nombre}
          </p>
          <p>{service.location}</p>
          <p>{service.descripcion}</p>
        </Grid>
        <Grid item xs={12} style={{ textAlign:'left', display: 'flex',justifyContent: 'space-between', flexDirection:'column'}}>
          <h2>${service.precio}/hora</h2>
          <Button
            onClick={() => {
              navigate(`/contratar/${service.id}`);
            }}
          >
            Contactar
          </Button>
        </Grid>
        {/* <Grid
          item
          xs={2}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Button
            onClick={() => {
              navigate(`/contratar/${service.id}`);
            }}
          >
            Contactar
          </Button> */}
        {/* </Grid> */}
      </Grid>
    </Item>
  );
};

export default Service;
