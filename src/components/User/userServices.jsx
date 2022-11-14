import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import React from "react";
import { useNavigate } from "react-router-dom";

const PrestadorService = ({ service }) => {
  const navigate = useNavigate();
  return (
    <Grid container item xs={12}>
      <Grid item xs={10} style={{ textAlign: "left" }}>
        <h2>{service.nombre}</h2>
        <p>Solicitado por: {service.prestador.nombre}</p>
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
          Contactar al usuario
        </Button>
      </Grid> */}
    </Grid>
  );
};

export const UserServices = ({ services }) => {
  return services.map((x, i) => {
    return <PrestadorService service={x} key={i} />;
  });
};
