import React from 'react';
import Background from '../components/layout/Background.jsx';
import SignupForm from '../components/auth/SignupForm.jsx';

const SignupPage = () => {
  return (
    <Background>
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <SignupForm />
      </div>
    </Background>
  );
};

export default SignupPage;