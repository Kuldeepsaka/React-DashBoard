import { useState } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Image } from 'react-bootstrap';
import CommonModal from '../../../commonModal/CommonModal';
import CommonInput from '../../commonInput';
import CommonButton from '../../CommonButton';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';  // Make sure you've installed react-toastify
import logo from '/assets/logo_icon.png';
import { useNavigate } from 'react-router-dom';
interface Props {
    onSubmit: (newPassword: string, confirmPassword: string) => void; // Parent callback function for form values
}

const ResetPasswordModal = NiceModal.create<Props>(({ onSubmit }) => {
    const modal = useModal(); // Use the modal instance from NiceModal
    const SuccessModal = useModal('SuccessModal');
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState<string>(''); // State for new password
    const [confirmPassword, setConfirmPassword] = useState<string>(''); // State for confirm password
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false); // Toggle visibility for new password
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false); // Toggle visibility for confirm password

    // Toggle password visibility
    const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    // Handle form submission
    const handleSubmit = () => {
        if (newPassword === confirmPassword) {
            // Passwords match, show them in console and success toast
            console.log('New Password:', newPassword);
            console.log('Confirm Password:', confirmPassword);
            onSubmit(newPassword, confirmPassword);

            toast.success('Passwords match! Reset successful.');

            // Close the modal
            modal.remove();
            SuccessModal.show();

        } else {
            // Passwords do not match, show error toast
            toast.error('Passwords do not match! Please try again.');
        }
    };
    const handleBackToPrevious = () => {
        modal.remove();
        navigate(-1);

    };


    return (
        <CommonModal
            show={modal.visible}
            onHide={modal.remove}
            footer={
                <>
                    <CommonButton onClick={handleSubmit} className="auth-btn">
                        Submit
                    </CommonButton>

                    <div className="form-text-bottom col-12 text-center mt-3">
                        <span className="back-to-previous" onClick={handleBackToPrevious}>
                            Back to Previous
                        </span>
                    </div>
                </>
            }
        >
            <div className="auth-card">
                <Image src={logo} alt="Logo" className="auth-logo" />
                <h2 className="mt-4 mb-2">Reset Password</h2>
                <p className="pb-3">Please choose a new password.</p>
                <div className="form-group">
                    <div className="position-relative">
                        <CommonInput
                            id="new-password"
                            label="New Password"
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)} // Update the state with new password
                            icon={showNewPassword ? (
                                <FaEyeSlash onClick={toggleNewPasswordVisibility} />
                            ) : (
                                <FaEye onClick={toggleNewPasswordVisibility} />
                            )}
                        />
                    </div>

                    <div className="position-relative mt-3">
                        <CommonInput
                            id="confirm-password"
                            label="Confirm Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} // Update the state with confirm password
                            icon={showConfirmPassword ? (
                                <FaEyeSlash onClick={toggleConfirmPasswordVisibility} />
                            ) : (
                                <FaEye onClick={toggleConfirmPasswordVisibility} />
                            )}
                        />
                    </div>
                </div>
            </div>
        </CommonModal>
    );
});

export default ResetPasswordModal;
