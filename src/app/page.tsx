'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HomePage from "./dashboard/page";
import useTokenExpiration from "@/@core/utils/auth/auth";

const Home = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Check for token on mount and handle token expiration
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
      router.push("/login"); // Redirect if no token
    }

    setLoading(false);
  }, [router]);

  // Monitor token expiration
  useTokenExpiration(); // Assume this hook will clear the token if it expires

  // Display loading indicator while checking token
  if (loading) {
    return <div>Loading...</div>; 
  }

  // Render HomePage if logged in, otherwise redirect
  return isLogged ? <HomePage /> : null;
};

export default Home;
