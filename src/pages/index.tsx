import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { adminDashboard, adminLogin } from '@/@core/utils/type/router';
import Header from '@/@core/components/Navbar';

const Home: React.FC = () => {
  const router = useRouter();


   useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('token_expiration');
    const currentTime = new Date().getTime();

    if (!token) {
      console.log('No token found. Redirecting to login.');
      router.push(adminLogin);
      return;
    }

    if (!tokenExpiration || currentTime > parseInt(tokenExpiration)) {
      console.log('Token expired. Redirecting to login.');
      localStorage.removeItem('token');
      localStorage.removeItem('token_expiration');
      router.push(adminLogin);
    } else {
      console.log('Token is valid. Redirecting to dashboard.');
      router.push(adminDashboard);
    }
  }, [router]);


  return (
    <Header>

    </Header>
  );
};

export default Home;
