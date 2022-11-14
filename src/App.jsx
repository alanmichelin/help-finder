import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import User from "./pages/User/User.jsx";
import Services from "./pages/Services/Services.jsx";
import MyServices from "./pages/Services/MyServices.jsx";
import HireService from "./pages/Services/HireService.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import NewService from "./components/Services/newService.jsx";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { fetchConfig } from "services/serviceService";
import { app, auth,  handleLogin } from "./firebase/app";
import useFirebaseAuthentication from "hooks/firebaseAuth";
import { unstable_batchedUpdates } from "react-dom";
export const ConfigContext = createContext(null);
export const AuthContext = createContext(null);
export const LocationContext = createContext(null);


const defaultLinks = [
  {name:"Iniciar sesion", url: "home"}
]
const userLinks = [
  { name: "Inicio", url: "home" },
  { name: "Buscar Servicios", url: "services" },
  { name: "Mis Servicios", url: "services" },
];

const prestadorLinks = [
  { name: "Inicio", url: "home" },
  { name: "Buscar Servicios", url: "services" },
  { name: "Agregar servicio", url: "new" },
  { name: "Mis Servicios", url: "services" },

];

function App() {
  const [config, setConfig] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [navbarLinks,setNavbarLinks] = useState(defaultLinks)
  const [isLoading, setIsLoading] = useState(true);

  const authUser = useFirebaseAuthentication(currentUser);

  const getLocation = () => {
    const successCallback = (position) => {
      setCurrentLocation(position);
    };
    const errorCallback = () => {};
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  useEffect(() => {
    const getConfig = async () => {
      const config = await fetchConfig();
      setConfig(config);
    };
    getConfig();
    getLocation();
  }, []);

  useEffect(() => {
    if(authUser && currentUser != authUser)
    {
      console.log(authUser)
      setCurrentUser(authUser);
    }
  }, [authUser]);

  const handleUser = async (_authUser) => {
    // console.log(authUser);
    const _handleLogin = await handleLogin({
      email: _authUser.email,
      displayName: _authUser.displayName,
    });
    setCurrentUser({ ...currentUser, ..._handleLogin.data });
  };

  useEffect(()=>{
    if(currentUser != null){
      
      if(currentUser?.isPrestador){
        setNavbarLinks(prestadorLinks)
      }
      else{
        setNavbarLinks(userLinks)
      }
    
    console.log(currentUser)
  }
  },[currentUser])

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider value={currentUser}>
          <ConfigContext.Provider value={config}>
            <LocationContext.Provider value={currentLocation}>
            <Navbar/>

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="user" element={<User />} />
                <Route path="services" element={<Services />} />
                <Route path="myservices" element={<MyServices />} />
                <Route path="new" element={<NewService />} />
                <Route path="contratar/:id" element={<HireService />} />
              </Routes>
            </LocationContext.Provider>
          </ConfigContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
