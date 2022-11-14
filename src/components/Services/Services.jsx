import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Service from "./Service";
import { fetchServices } from "../../services/serviceService.js";
import { useEffect, useState, useContext } from "react";
import React from "react";
import Filters from "components/Filters/filters";
import { Grid } from "@mui/material";
import GoogleMapReact from "google-map-react";
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import WaterDamageIcon from '@mui/icons-material/WaterDamage';
import ScienceIcon from '@mui/icons-material/Science';
const Services = () => {
  const [services, setServices] = useState([]);
  const [coords,setCoords] = useState([])
  const fetch = async (params) => {
    const res = await fetchServices(params);
    console.log(res);
    setServices(res);
  };
  // let map;

  // function initMap() {
  //   map = new google.maps.Map(document.getElementById("map"), {
  //     center: new google.maps.LatLng(-33.91722, 151.23064),
  //     zoom: 16,
  //   });
  
  const handleApplyFilters = (res) => {
    fetch(res);
  };

  const successCallback = async (position) => {
    setCoords([position.coords.latitude, position.coords.longitude]);
  };

  const errorCallback = (error) => {
    console.log(error);
  };
  useEffect(() => {
    fetch();
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  }, []);



  return (
    <Container maxWidth="lg" style={{ paddingTop: "10vh" }}>
      <Filters onApplyFilters={handleApplyFilters} />
      <div style={{width:'100%', display: 'flex',justifyContent: 'center', margin:'25px'}}>
        
     {services && coords[0] && coords[1] && <SimpleMap lat={coords[0]} long={coords[1]} services={services}/>}
     </div>

      <Grid container item xs={12}>

      {services && services.map((x) => {
      return <Grid item xs={3} style={{marginRight:'60px'}}>
      <Service service={x} key={x.id} />
      </Grid>
      
      })}
      </Grid>

    </Container>
  );
};

const UserIcon = ({ text }) => <span><PersonPinCircleIcon style={{color:'red'}}/> YO </span>;

const ServicesIcon = ({ service }) => {

return <span style={{fontSize:'14px'}}>
  {(service.tipo === "ELECTRICISTA" && <ElectricBoltIcon style={{color:'yellow',}}/>) || 
  (service.tipo === "FONTANERO" && <PlumbingIcon style={{color:'grey'}}/>) ||
  (service.tipo === "PLOMERO" && <WaterDamageIcon style={{color:'blue'}}/>) ||
  (service.tipo === "GASISTA" && <ScienceIcon style={{color:'green'}}/>) }
  {service.tipo} 
  </span>
};


function SimpleMap({lat,long,services}){
  const defaultProps = {
    center: {
      lat: lat,
      lng: long
    },
    zoom: 15
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '30vw', width: '30vw' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${process.env.REACT_APP_MAPS_API_KEY}`}}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <UserIcon
          lat={lat}
          lng={long}
          text="My Marker"
        />
        {services.map(x=>{
          console.log(x.coords._lat,x.coords._long)
          return <ServicesIcon service={x} lat={x.coords._lat} lng={x.coords._long}/>
        })}
      </GoogleMapReact>
    </div>
  );
}

export default Services;
