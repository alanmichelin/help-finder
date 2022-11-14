import { useEffect, useState } from "react";
import { app, auth, handleLogin } from "../firebase/app";
import { getAuth } from "firebase/auth";

const useFirebaseAuthentication = (currentUser) => {
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    const auth = getAuth()
    const handleUser = async (_authUser) => {
      console.log(authUser);
      const _handleLogin = await handleLogin({
        email: _authUser.email,
        displayName: _authUser.displayName,
      });
      setAuthUser({ ..._authUser, ..._handleLogin.data });
    };
    const unlisten = auth.onAuthStateChanged((authUser) => {
      authUser ? handleUser(authUser) : setAuthUser(null);
    });
    return () => {
      unlisten();
    };
  }, []);

  return authUser;
};

export default useFirebaseAuthentication;
