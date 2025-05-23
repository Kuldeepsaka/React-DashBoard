import { useCallback, useState } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import CommonModal from '../../../commonModal/CommonModal';
import { Image } from 'react-bootstrap';
import logo from '/assets/logo_icon.png';
import OtpInput from '../../OtpInput';
import CommonButton from '../../CommonButton';
import { toast } from 'react-toastify';

// Define Props interface
interface Props {
    email: string;
    title: string;
    onOtpChange: (val: string) => void;
    onOtpComplete: (val: string) => void;
    isLoading: boolean;
}

const OtpModal = NiceModal.create<Props>(({ email, title, onOtpChange, onOtpComplete, isLoading }) => {
    const modal = useModal();
    const resetPasswordModal = useModal('ResetPasswordModal');

    const defaultOtp = '123456';

    const [otpValue, setOtpValue] = useState<string>('');

    const handlePasswordResetSubmit = (newPassword: string, confirmPassword: string) => {
        // Your logic for submitting the password, e.g., API call
        console.log("New Password:", newPassword);
        console.log("Confirm Password:", confirmPassword);
    };

    const closeModal = useCallback(() => {
        modal.remove();
    }, [modal]);

    // Update local state when OTP input is complete
    const handleOtpComplete = (val: string) => {
        setOtpValue(val); // Store OTP
        onOtpComplete?.(val); // Also forward it to parent if needed
    };

    const handleVerify = () => {
        if (otpValue === defaultOtp) {
            toast.success('OTP Verified');
            closeModal();

            if (title === 'Verify Email') {
                closeModal();
            }
            else {
                resetPasswordModal.show({ onSubmit: handlePasswordResetSubmit });
            }
        } else {
            toast.error('Invalid OTP');
        }
    };

    const handleBackToPrevious = () => {
        // navigate(-1);
        closeModal();
    };

    return (
        <CommonModal show={modal.visible} onHide={closeModal} backdrop="static" keyboard={false}>
            <div className="auth-card">
                <Image src={logo} alt="Logo" className="auth-logo" />
                <h2 className="mt-4">{title && title ? title : 'OTP'}</h2>
                <p>Enter the 6-digit verification code we sent to your email ID {email && email ? email : ''}.</p>
                <OtpInput
                    onChange={onOtpChange}
                    onComplete={handleOtpComplete} // use local handler
                    resendLink="/"
                />
                <CommonButton
                    onClick={handleVerify}
                    disabled={isLoading}
                    className="auth-btn"
                >
                    {isLoading ? 'Verifying...' : 'Verify'}
                </CommonButton>
                <div className="form-text-bottom col-12 text-center mt-3">
                    <span className="back-to-previous" onClick={handleBackToPrevious}>
                        Back to Previous
                    </span>
                </div>
            </div>
        </CommonModal>
    );
});

export default OtpModal;
