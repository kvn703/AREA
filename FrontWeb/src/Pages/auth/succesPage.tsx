import React, { useEffect } from 'react';

const AuthSuccess: React.FC = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
    }
    window.location.href = import.meta.env.VITE_DNS_NAME + ':8081/profilPage';
  }, []);

  return (
    <div>
      Redirection après l'authentification...
    </div>
  );
}

export default AuthSuccess;
