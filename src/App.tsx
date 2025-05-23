import React, { useState, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AppWithNiceModal from './AppWithNiceModal'; // ✅ Imported AppShell wrapper

// Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/dashboard/Dashboard';
import Settings from './pages/dashboard/Settings';
import Invest from './pages/dashboard/Invest';
import TreeHistory from './pages/dashboard/TreeHistory';
import Withdrawals from './pages/dashboard/Withdrawals';

import './NiceModalRegistry'; // modal registration

// Components
import Loader from './components/common/Loader';

// Route Guards
import RequireAuth from './components/route/RequireAuth';
import RequireGuest from './components/route/RequireGuest';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <AppWithNiceModal />, // ✅ AppShell provides NiceModal context
        children: [
          {
            element: <RequireGuest />,
            children: [
              {
                element: <AuthLayout />,
                children: [
                  { index: true, element: <Login /> },
                  { path: 'signup', element: <Signup /> },
                  { path: 'forgot-password', element: <ForgotPassword /> },
                ],
              },
            ],
          },
          {
            path: 'dashboard',
            element: <RequireAuth />,
            children: [
              {
                element: <DashboardLayout />,
                children: [
                  { index: true, element: <Dashboard /> },
                  { path: 'invest', element: <Invest /> },
                  { path: 'tree-history', element: <TreeHistory /> },
                  { path: 'withdrawals', element: <Withdrawals /> },
                  { path: 'settings', element: <Settings /> },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
    {
      future: {
        v7_relativeSplatPath: true,
      },
    }
  );

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
