import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { ConfigContext } from "../../App.jsx";
import Slider from "@mui/material/Slider";

const Filters = ({ onApplyFilters }) => {
  const [inputServicio, setInputServicio] = useState("CUALQUIERA");
  const [inputProximidad, setInputProximidad] = useState("");
  const [servicios, setServicios] = useState([]);
  const [priceMin,setPriceMin] = useState(0)
  const [priceMax,setPriceMax] = useState(0)
  const handleChange = (event) => {
    setInputServicio(event.target.value);
  };
  const config = useContext(ConfigContext);

  useEffect(() => {
    setServicios(config["tipo_servicios"]);
  }, [config]);

  const handleFilter = () => {
    var filters = onApplyFilters({
      tipo: inputServicio,
      geolocalizacion: inputProximidad, // hacer calculo de kms a location
      priceMax: priceMax
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        Filtros
      </Grid>
      <Grid container>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <span>Tipo de servicio:</span>
            <Select
              value={inputServicio}
              onChange={handleChange}
              defaultValue={inputServicio}
              size={'small'}
            >
              <MenuItem value="CUALQUIERA" key={"CUALQUIERA"}>CUALQUIERA</MenuItem>
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
        </Grid>
        <Grid item xs={3} style={{ marginLeft: "25px" }}>
          <FormControl fullWidth>
            <span>Proximidad en kilometros:</span>
            <Slider
              min={1}
              max={20}
              defaultValue={5}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
          </FormControl>
        </Grid>
        <Grid item xs={3} >
            <FormControl >
            <span>Precio maximo</span>
            <Input name="precioMax" type="number" onChange={(e)=>{setPriceMax(parseInt(e.target.value))}} />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={handleFilter}>Aplicar</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Filters;
