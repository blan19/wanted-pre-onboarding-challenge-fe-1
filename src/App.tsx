import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/loading";
import Home from "./pages/Home";

const Auth = lazy(() => import("./pages/Auth"));
const Login = lazy(() => import("./pages/Auth/login"));
const SignUp = lazy(() => import("./pages/Auth/signUp"));

const Todos = lazy(() => import("./pages/Todos"));
const TodoCreate = lazy(() => import("./pages/Todos/todoCreate"));
const TodoDetail = lazy(() => import("./pages/Todos/todoDetail"));

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
        </Route>
        <Route path="todos" element={<Todos />}>
          <Route path=":id" element={<TodoDetail />} />
        </Route>
        <Route path="/todos/create" element={<TodoCreate />} />
      </Routes>
    </Suspense>
  );
};

export default App;
