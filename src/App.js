import Chat from "./Chat";
import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";

import { selectUser } from "./features/userSlice";
import Login from "./Login";
import { auth } from "./firebase";
import { login, logout } from "./features/userSlice";

function App() {
  const dispatch = useDispatch(); //pushs stuff into datalayer
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("user is", authUser);
      if (authUser) {
        //user is logged in
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        //else user logged out
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    //BEM naming conventaion
    <div className="app">
      {user ? (
        <>
          {/* Sidebar*/}
          <Sidebar />
          {/* Chat */}
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
