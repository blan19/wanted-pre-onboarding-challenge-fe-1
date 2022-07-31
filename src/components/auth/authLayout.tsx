import React from "react";
import style from "./style.module.css";

const AuthView = ({ children }: { children: React.ReactNode }) => {
  return <main className={`${style.container}`}>{children}</main>;
};

export default AuthView;
