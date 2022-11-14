import { LocationContext } from "App";
import React, { useContext } from "react";

const Maps = () => {
  const location = useContext(LocationContext);
  console.log(location);
  return (
    <iframe
      title="map"
      width="600"
      height="450"
      style={{ border: 0 }}
      loading={"lazy"}
      // allowfullscreen
      // referrerpolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_MAPS_API_KEY}&q=${location.coords.latitude},${location.coords.longitude}`}
    ></iframe>
  );
};

export default Maps;
