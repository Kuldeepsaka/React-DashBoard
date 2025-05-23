import React, { useState } from 'react';
import CommonCard from '../../components/authCard/commonCard';
import './auth.scss';
import logo from '/assets/logo_icon.png';
import { Image } from 'react-bootstrap';
import CommonInput from '../../components/common/commonInput';
import CommonButton from '../../components/common/CommonButton';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useModal } from '@ebay/nice-modal-react';

const ForgotPassword: React.FC = () => {

  const OtpModal = useModal("OtpModal");

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validate email using simple regex
  const isValidEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  // Handle submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      return setError('Email is required');
    }

    if (!isValidEmail(email)) {
      toast.error('Invalid email address!');
      return;
    }

    // Show loading spinner
    setIsLoading(true);

    // Simulate an API call
    setTimeout(() => {
      console.log("Form submitted with email:", email);

      setIsLoading(false);
      OtpModal.show({ email });
      // Show modal if email is valid
    }, 1000);
  };

  // Handle email change dynamically
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <CommonCard>
      <form onSubmit={handleSubmit}>
        <div className='auth-card'>
          <Image src={logo} alt="Logo" className="auth-logo" />
          <h2 className="mt-4">Forgot your password</h2>
          <p className='pb-4'>Enter the email address associated with your account.</p>
          <CommonInput
            id="email"
            label="Email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={onEmailChange}
            disabled={isLoading}
          />
          {error && <div className="input-error">{error}</div>}
        </div>

        <CommonButton type="submit" isLoading={isLoading} className="auth-btn">
          Send Code
        </CommonButton>

        <div className="form-text-bottom mt-3">
          <Link to="/">
            <span>Back to Previous</span>
          </Link>
        </div>
      </form>
    </CommonCard>
  );
};

export default ForgotPassword;
