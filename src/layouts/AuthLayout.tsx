import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  const currentYear = new Date().getFullYear(); // Get the current year


  return (
    <div className="auth-layout">
      <div className="auth-content">
        <Outlet />
      </div>
      <div className="auth-footer">
        <p>© {currentYear} EG Life. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AuthLayout;
