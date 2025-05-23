// SuccessModal.tsx
import { useCallback, useRef } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Image } from 'react-bootstrap';
import logOut from '/assets/logOut.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import CommonModal from '../../../commonModal/CommonModal';
import CommonButton from '../../CommonButton';
import { useDispatch } from 'react-redux';
import { logout } from '../../../../store/slices/authSlice';
import useGsapModalAnimation from '../../Hooks/useGsapModalAnimation.tsx';

const LogOutModal = NiceModal.create(() => {
    const modal = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const modalRef = useRef<HTMLDivElement>(null);
    const { animateClose } = useGsapModalAnimation(modalRef, modal.visible, () => modal.remove());

    const handleLogout = useCallback(() => {
        dispatch(logout());
        animateClose();
        navigate('/');
    }, [dispatch, animateClose, navigate]);

    return (
        <CommonModal show={modal.visible} onHide={animateClose}>
            <div className="col-12 text-center auth-card" ref={modalRef}>
                <Image src={logOut} alt="Success" className="auth-logo m-auto my-3" />
                <h2>Logout</h2>
                <p>Are you sure you want to Logout from this account?</p>
                <CommonButton className="auth-logo my-3 m-auto" onClick={handleLogout}>
                    Logout
                </CommonButton>
            </div>
        </CommonModal>
    );
});

export default LogOutModal;
