import React from 'react';
import LoginForm from '../componentes/LoginForm';

const Login = () => (
  <div
    className="min-h-screen flex items-center justify-center bg-cover bg-center"
    style={{
      backgroundColor: 'rgba(0,0,0,0.4)',
      backgroundBlendMode: 'darken',
    }}
  >
    <LoginForm />
  </div>
);

export default Login; 