import { db } from "../firebase/app";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";

// export const fetchServices = async (params) => {

//   let ref = collection(db, "servicios");
//   var _query = ref;
//   if (params) {
//     console.log(params.tipo)
//     if (!!params.tipo && params.tipo !== "CUALQUIERA") {
//       _query = query(ref, where("tipo", "==", params.tipo));
//     }
//     if (!!params["geolocalizacion"]) {
//       _query = query(
//         ref,
//         where("geolocalizacion", "==", params["geolocalizacion"])
//       );
//     }
//     if(params.priceMin !== 0){
//       _query = query(ref, where("precio", ">", params.priceMin));
//     }
//     if(params.priceMax !== 0){
//       _query = query(ref, where("precio", "<", params.priceMax));
//     }
//   } else {
//     _query = ref;
//   }
//   const querySnapshot = await getDocs(_query);
//   const servicios = [];
//   querySnapshot.forEach((doc) => {
//     servicios.push({ ...doc.data(), id: doc.id });
//   });
//   return servicios;
// };
export const fetchServices = async (params) => {
  console.log(params);
  const constraints = [];

  let q = query(collection(db, "servicios"));

  if (params) {
    if (!!params.tipo && params.tipo !== "CUALQUIERA") {
      constraints.push(where("tipo", "==", params.tipo));
    }
    if (!!params.priceMax && params.priceMax !== 0) {
      constraints.push(where("precio", "<", params.priceMax));
    }
    q = query(collection(db, "servicios"), ...constraints);
    console.log(constraints);
    console.log(q);
  }
  const querySnapshot = await getDocs(q);
  const servicios = [];
  querySnapshot.forEach((doc) => {
    servicios.push({ ...doc.data(), id: doc.id });
  });
  return servicios;
};

export const setPrestador = (id, _isPrestador) => {
  let ref = doc(db, "users", id);
  updateDoc(ref, { isPrestador: _isPrestador });
};

export const updateCalificacion = async (puntuacion, text, id) => {
  const prestador = await fetchPrestadorById(id);
  let ref = doc(db, "users", id);
  updateDoc(ref, {
    puntuacionTotal: increment(puntuacion),
    cantPuntuaciones: increment(1),
    promedio:
      (prestador?.puntuacionTotal + puntuacion || puntuacion) /
      (prestador?.cantPuntuaciones +1|| 1),
    calificaciones: arrayUnion({
      fecha: new Date(),
      comentario: text,
      puntuacion: puntuacion,
    }),
  });
  return "ok"
};

export const fetchService = async (id) => {
  let ref = doc(db, "servicios", id);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    return docSnap.data();
  }
};

export const fetchPrestadorById = async (id) => {
  let ref = doc(db, "users", id);
  const docSnap = await getDoc(ref);
  let data;
  if (docSnap.exists()) {
    data = docSnap.data();
  }
  return data;
};



export const getRequestsPrestador = async (id) => {
  let ref = collection(db, "requests");
  let q = query(ref, where("prestador", "==", id));
  const requests = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    requests.push({ ...doc.data(), id: doc.id });
  });
  return requests;
};

export const getRequestsUsuario = async (id) => {
  let ref = collection(db, "requests");
  let q = query(ref, where("solicitante", "==", id));
  const requests = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    requests.push({ ...doc.data(), id: doc.id });
  });
  return requests;
};

export const addServiceRequest = async (service) => {
  return await addDoc(collection(db, "requests"), service);
};

export const acceptServiceRequest = (id) => {
  let ref = doc(db, "requests", id);
  updateDoc(ref, { accepted: true });
};

export const completeServiceRequest = async (id) => {
  let ref = doc(db, "requests", id);
  updateDoc(ref, { completed: true });
  return "ok"
};

export const rejectServiceRequest = (id) => {
  let ref = doc(db, "requests", id);
  updateDoc(ref, { cancelled: true });
};

export const fetchConfig = async () => {
  const docRef = doc(db, "config", "config");
  const docSnap = await getDoc(docRef);
  // console.log(docSnap);
  return docSnap.data();
};

export const addService = async (servicio) => {
  return await addDoc(collection(db, "servicios"), servicio);
};

export const getDataFromGeolocation = async (x, y) => {
  const data = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${x},${y}&key=${process.env.REACT_APP_MAPS_API_KEY}`
  );
  return await data.json();
};
