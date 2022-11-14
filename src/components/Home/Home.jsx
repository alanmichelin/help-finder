import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import React from "react";
const Home = () => {
  return (
    <Container maxWidth="lg" style={{ paddingTop: "30vh" }}>
      <Button variant="outlined" style={{ width: "150px", height: "150px" }}>
        Home
      </Button>
      <div id="firebaseui-auth-container" style={{}}></div>
    </Container>
  );
};

export default Home;
