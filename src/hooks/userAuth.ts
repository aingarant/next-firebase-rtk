import {
  login as reduxLogin,
  logout as reduxLogout,
} from "@/redux/userSlice";
import { useDispatch } from "react-redux";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";

import { useEffect, useState } from "react";

export const useAuth = () => {

  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(getAuth(), email, password);
  };

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(getAuth(), email, password);
  };

  const logout = () => {
    return signOut(getAuth());
  };

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(getAuth(), email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        dispatch(reduxLogin({ userId: user.uid, isAuth: true }));
        setCurrentUser(user)
      } else {
        console.log("not logged in")
        dispatch(reduxLogout());
    
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    login,
    signup,
    logout,
    resetPassword,
    currentUser
  };
};
