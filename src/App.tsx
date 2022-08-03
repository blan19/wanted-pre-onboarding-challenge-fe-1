import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const Auth = lazy(() => import("./pages/Auth"));
const Login = lazy(() => import("./pages/Auth/login"));
const SignUp = lazy(() => import("./pages/Auth/signUp"));

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/auth" element={<Auth />}>
        <Route path="login" element={<Login />} />
        <Route path="signUp" element={<SignUp />} />
      </Route>
    </Routes>
  );
};

export default App;
