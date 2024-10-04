"use client"
import { useState } from "react";
import Login from "@/@core/components/auth/login/login";
import NavbarLayout from "@/@core/components/navbar/navbarLayout";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <NavbarLayout /> 
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} /> 
      )}
    </>
  );
};

export default Home;
