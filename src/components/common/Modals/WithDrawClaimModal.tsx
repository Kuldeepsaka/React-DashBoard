import { useCallback, useRef } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import CommonModal from '../../commonModal/CommonModal';
import CommonButton from '../CommonButton';
import ClaimImg from '../../../assets/claim.png';

import { toast } from 'react-toastify';
import { Image } from 'react-bootstrap';
import useGsapModalAnimation from '../Hooks/useGsapModalAnimation';

const WithDrawClaimModal = NiceModal.create(() => {
    const modal = useModal();

    const modalRef = useRef<HTMLDivElement>(null);
    const { animateClose } = useGsapModalAnimation(modalRef, modal.visible, () => modal.remove());

    const claimRewards = useCallback(() => {
        console.log('Rewards claimed for Gold Plan!');
        toast.success('Reward claimed successfully!');
        animateClose();
    }, [animateClose]);

    return (
        <CommonModal show={modal.visible} onHide={animateClose}>
            <div className="auth-card text-center" ref={modalRef}>
                <Image src={ClaimImg} alt="Claim Icon" className="claim-icon m-auto" />
                <h2 className="mt-4">Claim</h2>
                <p>Do you want to claim the Reward amount for the Gold Plan?</p>

                <div className="d-flex justify-content-center gap-3 mt-4">
                    <CommonButton className="w-50 cancel-btn" onClick={animateClose}>
                        No
                    </CommonButton>
                    <CommonButton className="w-50" onClick={claimRewards}>
                        Yes
                    </CommonButton>
                </div>
            </div>
        </CommonModal>
    );
});

export default WithDrawClaimModal;
