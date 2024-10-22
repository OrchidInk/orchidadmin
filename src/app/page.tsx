'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HomePage from "./home/page";
import useTokenExpiration from "@/@core/utils/auth/auth";


const Home = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter(); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false); 
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !isLogged) {
      router.push("/login");
    }
  }, [isLogged, loading, router]);

  useTokenExpiration()

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (isLogged) {
    return (
      <div>
        <HomePage />
      </div>
    );
  }

  return null; 
};

export default Home;
