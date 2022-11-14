import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "App";
import { useEffect } from "react";

const defaultLinks = [{ name: "Iniciar sesion", url: "home" }];


const NavBar = () => {
  const user = useContext(AuthContext);
  const [navbarLinks, setNavBarLinks] = React.useState([
    { name: "Buscar Servicios", url: "services" },
    { name: "Mis Servicios", url: "myservices" },
  ])

useEffect(()=>{
  if(user && user.isPrestador){
    setNavBarLinks([...navbarLinks, { name: "Agregar servicio", url: "new" }])
  }
},[user])
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HelpFindr
          </Typography>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HelpFindr
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navbarLinks &&
              navbarLinks.map((page, index) => (
                <Button
                  key={index}
                  sx={{ my: 2, color: "white", display: "block" }}
                  href={"/" + page.url}
                >
                  {page.name}
                </Button>
              ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            <Typography style={{ marginRight: "15px" }}>
              Bienvenido {user ? user.displayName : "Usuario"}!
            </Typography>
            <Link to="/user">
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="" src={user && user.photoURL} />
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
