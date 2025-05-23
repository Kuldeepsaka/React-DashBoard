import React, { useRef, useState } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import CommonModal from '../../commonModal/CommonModal';
import CommonInput from '../commonInput';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import CommonButton from '../CommonButton';
import { toast } from 'react-toastify';
import useGsapModalAnimation from '../Hooks/useGsapModalAnimation';

const ChangePasswordModal = NiceModal.create(() => {
    const modal = useModal();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const modalRef = useRef<HTMLDivElement>(null);
    const { animateClose } = useGsapModalAnimation(modalRef, modal.visible, () => modal.remove());




    const toggleCurrentVisibility = () => setShowCurrentPassword(prev => !prev);
    const toggleNewVisibility = () => setShowNewPassword(prev => !prev);
    const toggleConfirmVisibility = () => setShowConfirmPassword(prev => !prev);

    const isButtonDisabled = !currentPassword || !newPassword || !confirmPassword;

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match");
            return;
        }

        setIsLoading(true);

        // Simulated async request
        setTimeout(() => {
            setIsLoading(false);
            console.log('Current Password:', currentPassword);
            console.log('New Password:', newPassword);
            console.log('Confirm Password:', confirmPassword);

            toast.success("Password changed successfully");
            modal.remove();
        }, 1000);
    };



    return (
        <CommonModal show={modal.visible} onHide={animateClose}>
            <div className="auth-card" ref={modalRef}>
                <h2 className="my-2">Change Password</h2>
                <p>Please enter your current and new password</p>
                <form onSubmit={onSubmit} className="auth-form mt-4">
                    <CommonInput
                        id="currentPassword"
                        label="Current Password"
                        type={showCurrentPassword ? 'text' : 'password'}
                        placeholder="Enter current password"
                        icon={showCurrentPassword ? <FaEye /> : <FaEyeSlash />}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        disabled={isLoading}
                        onIconClick={toggleCurrentVisibility}
                    />
                    <CommonInput
                        id="newPassword"
                        label="New Password"
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="Enter new password"
                        className="mb-4"
                        icon={showNewPassword ? <FaEye /> : <FaEyeSlash />}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        disabled={isLoading}
                        onIconClick={toggleNewVisibility}
                    />
                    <CommonInput
                        id="confirmPassword"
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm new password"
                        className="mb-4"
                        icon={showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isLoading}
                        onIconClick={toggleConfirmVisibility}
                    />
                    <CommonButton
                        className="w-100 mt-3"
                        type="submit"
                        disabled={isLoading || isButtonDisabled}
                    >
                        {isLoading ? 'Saving...' : 'Save'}
                    </CommonButton>
                </form>
            </div>
        </CommonModal>
    );
});

export default ChangePasswordModal;
