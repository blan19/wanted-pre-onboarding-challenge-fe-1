import React from "react";

const AuthView = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full flex justify-center items-center">{children}</main>
  );
};

export default AuthView;
