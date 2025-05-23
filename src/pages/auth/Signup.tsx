import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import CommonCard from '../../components/authCard/commonCard';
import CommonInput from '../../components/common/commonInput';
import CommonButton from '../../components/common/CommonButton';
import { isValidNameInput, isValidPhoneInput } from '../../components/utils/helper';
import { useModal } from '@ebay/nice-modal-react';

import logo from '/assets/logo_icon.png';
import './auth.scss';

const Signup: React.FC = () => {
  const OtpModal = useModal('OtpModal');
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [referral, setReferral] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isValidNameInput(value)) setName(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isValidPhoneInput(value)) setPhone(value);
  };

  const verifyEmail = () => {
    if (!email) {
      toast.error('Please enter an email first.');
      return;
    }

    // ✅ Email pattern validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    // Show the OTP Modal only if the email is valid
    OtpModal.show({
      title: 'Verify Email',
      email,
      onOtpComplete: handleOtpComplete, // Pass the OTP completion handler

    });
  };

  const handleOtpComplete = (otp: string) => {
    // Handle the OTP value after it's verified
    if (otp === '123456') {
      setIsEmailVerified(true);
    } else {
      setIsEmailVerified(false);
    }
  };


  const handleSignUpSuccess = () => {
    // Replace with actual API call
    toast.success('Signup successful!');
    navigate('/');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!isEmailVerified) {
      toast.error('Please verify your email before signing up.');
      setIsLoading(false);
      return;
    }

    setError(null);
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Call handleSignUpSuccess after API call or validation
    handleSignUpSuccess();
    setIsLoading(false);
  };

  return (
    <CommonCard>
      <div className="auth-card">
        <Image src={logo} alt="Logo" className="auth-logo" />
        <h2>Sign Up</h2>
        <p>Create an account to continue.</p>

        {error && <div className="alert alert-danger mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <CommonInput
            id="name"
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChange={handleNameChange}
            disabled={isLoading}
          />

          <CommonInput
            id="email"
            label="Email"
            type="email"
            className="mb-3"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            rightContent={
              email ? (
                !isEmailVerified ? (
                  <button
                    type="button"
                    className="verify-email-btn"
                    onClick={verifyEmail}
                    disabled={isLoading}
                  >
                    Verify Email
                  </button>
                ) : (
                  <button
                    type="button"
                    className="verify-email-btn confirmed"
                    disabled
                  >
                    Confirmed
                  </button>
                )
              ) : null
            }
          />


          <CommonInput
            id="phone"
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={handlePhoneChange}
            disabled={isLoading}
          />

          <CommonInput
            id="referral"
            label="Referral Code"
            className="mb-3"
            placeholder="Referral Code Here"
            value={referral}
            onChange={(e) => setReferral(e.target.value)}
            disabled={isLoading}
          />

          <div className="row">
            <div className="col-md-6">
              <CommonInput
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                icon={
                  showPassword ? (
                    <FaEyeSlash onClick={() => setShowPassword(false)} />
                  ) : (
                    <FaEye onClick={() => setShowPassword(true)} />
                  )
                }
              />
            </div>
            <div className="col-md-6">
              <CommonInput
                id="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                icon={
                  showConfirmPassword ? (
                    <FaEyeSlash onClick={() => setShowConfirmPassword(false)} />
                  ) : (
                    <FaEye onClick={() => setShowConfirmPassword(true)} />
                  )
                }
                className={
                  confirmPassword
                    ? password === confirmPassword
                      ? 'is-valid'
                      : 'is-invalid'
                    : ''
                }
                feedback={
                  confirmPassword &&
                  (password === confirmPassword
                    ? 'Passwords match!'
                    : 'Passwords do not match!')
                }
                feedbackClass={
                  password === confirmPassword ? 'text-success' : 'text-danger'
                }
              />
            </div>
          </div>

          <CommonButton
            type="submit"
            isLoading={isLoading}
            className="auth-btn"
            disabled={isLoading || !isEmailVerified}
          >
            Sign Up
          </CommonButton>
        </form>

        <div className="form-text-bottom">
          Already have an account? <Link to="/">Log in</Link>
        </div>
      </div>
    </CommonCard>
  );
};

export default Signup;
