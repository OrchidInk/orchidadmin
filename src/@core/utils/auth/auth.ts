import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useTokenExpiration = () => {
  const router = useRouter();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const expirationTime = localStorage.getItem('token_expiration');
      if (expirationTime && new Date().getTime() > parseInt(expirationTime, 10)) {
        localStorage.removeItem('token');
        localStorage.removeItem('token_expiration');
        router.push('/admin/login');
      }
    };

    checkTokenExpiration();

    const interval = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(interval);
  }, [router]);
};

export default useTokenExpiration;