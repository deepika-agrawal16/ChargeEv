import React from 'react';
import Background from '../components/layout/Background.jsx';
import LoginForm from '../components/auth/LoginForm.jsx';

const LoginPage = () => {
  return (
    <Background>
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <LoginForm />
      </div>
    </Background>
  );
};

export default LoginPage;