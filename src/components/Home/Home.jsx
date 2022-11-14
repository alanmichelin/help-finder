import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import React, { useContext } from "react";
import { AuthContext } from "App";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const user = useContext(AuthContext);

  const handleClick = () =>{
    getAuth().signOut()
  }
  return (
    <Container maxWidth="lg" style={{ paddingTop: "30vh" }}>
     { !user && <>
      <p> Bienvenido! Inicia sesion:</p>
      <div id="firebaseui-auth-container" style={{}}></div>
      </>
      }
      {
        user && user.id && <Button onClick={handleClick}> Cerrar sesion</Button>
      }
    </Container>
  );
};

export default Home;
