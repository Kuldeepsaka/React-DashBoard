import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { Image } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '/assets/logo_icon.png';
import CommonCard from '../../components/authCard/commonCard';
import CommonInput from '../../components/common/commonInput';
import CommonButton from '../../components/common/CommonButton';
import './auth.scss';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) return setError('Email is required');
    if (!password) return setError('Password is required');

    setIsLoading(true);
    dispatch(loginRequest());

    setTimeout(() => {
      if (email === 'demo@example.com' && password === 'password') {
        const user = {
          id: '1',
          name: 'John Doe',
          email: 'demo@example.com',
        };

        dispatch(loginSuccess({ user, token: 'mock-jwt-token' }));
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
        dispatch(loginFailure('Invalid email or password'));
      }

      setIsLoading(false);
    }, 1000);
  };

  return (
    <CommonCard>
      <div className="auth-card">
        <Image src={logo} alt="Logo" className="auth-logo" />
        <h2>Welcome Back!</h2>
        <p>Enter your credentials to access your account.</p>


        <form onSubmit={handleSubmit} className='auth-form'>
          <div className='col-12 positon-relative'>
            <CommonInput
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />

          </div>
          <div className='col-12 positi on-relative'>
            <CommonInput
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              icon={showPassword ? <FaEyeSlash onClick={() => setShowPassword(false)} /> : <FaEye onClick={() => setShowPassword(true)} />}
            />
            {error && (
              <div className="input-error" role="alert">
                {error}
              </div>
            )}
          </div>


          <div className="d-flex justify-content-end align-items-center mb-2">
            <Link to="/forgot-password" className="form-note">Forgot password?</Link>
          </div>

          <CommonButton type="submit" isLoading={isLoading} className='auth-btn'>
            Sign In
          </CommonButton>
        </form>

        <div className="form-text-bottom">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </CommonCard>
  );
};

export default Login;
