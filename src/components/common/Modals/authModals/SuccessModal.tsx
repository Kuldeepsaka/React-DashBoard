// SuccessModal.tsx
import { useCallback } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Image } from 'react-bootstrap';
import right from '/assets/right.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import CommonModal from '../../../commonModal/CommonModal';
import CommonButton from '../../CommonButton';

const SuccessModal = NiceModal.create(() => {
    const modal = useModal();
    const navigate = useNavigate(); // Use navigate hook

    const closeModal = useCallback(() => {
        modal.remove();
    }, [modal]);

    const navigateToSignIn = useCallback(() => {
        navigate('/'); // Navigate to the home page
        closeModal();
    }, [closeModal, navigate]);

    return (
        <CommonModal show={modal.visible} onHide={closeModal}>
            <div className="col-12 text-center">
                <Image src={right} alt="Success" className="auth-logo m-auto my-3" />
                <h2>Successful</h2>
                <p>New password has been reset successfully.</p>
                <CommonButton className="auth-logo my-3 m-auto" onClick={navigateToSignIn}>
                    Continue to Sign In
                </CommonButton>
            </div>
        </CommonModal>
    );
});

export default SuccessModal;
