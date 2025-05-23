import React, { useState } from 'react';
import CommonCard from '../../../components/dashCard/commonCard';
import { useModal } from '@ebay/nice-modal-react';
import '../withDrawals.scss';
import { Image } from 'react-bootstrap';
import GiftImage from '../../../assets/Gift.png';
import RewardsImg from '../../../assets/reward.png';
import GrothImg from '../../../assets/growth.png';
import ClaimImg from '../../../assets/claim.png';
import CommonButton from '../../../components/common/CommonButton';
import CommonModal from '../../../components/commonModal/CommonModal';

const rewardData = [
    { id: 1, label: 'Matching Rewards', value: '$100', icon: GiftImage },
    { id: 2, label: 'Level Rewards', value: '$100', icon: RewardsImg },
    { id: 3, label: 'Staking Rewards', value: '$100', icon: GrothImg },
];

const WithdrawalRewards: React.FC = () => {

    const WithDrawClaimModal = useModal("WithDrawClaimModal");

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);

    const claimRewards = () => {
        console.log('Rewards claimed!');
        handleCloseModal();
    };

    return (
        <>
            <CommonCard className='col-lg-7 custom-card'>
                <div className='row'>
                    {rewardData.map((reward) => (
                        <div className='col-md-4 mb-3 reward-col' key={reward.id}>
                            <Image src={reward.icon} alt={reward.label} />
                            <div className='mt-auto'>
                                <p>{reward.label}</p>
                                <h3>{reward.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='col-12 text-center my-3'>
                    <CommonButton className='w-auto' onClick={() => { WithDrawClaimModal.show() }}>
                        Claim All
                    </CommonButton>
                </div>
            </CommonCard>

            <CommonModal show={showModal} onHide={handleCloseModal}>
                <div className="auth-card text-center">
                    <Image src={ClaimImg} alt="Claim Icon" className="claim-icon m-auto" />
                    <h2 className="mt-4">Claim</h2>
                    <p>Do you want to claim the Reward amount for the Gold Plan?</p>

                    <div className='d-flex justify-content-center gap-3 mt-4'>
                        <CommonButton className='w-50 cancel-btn ' onClick={handleCloseModal}>
                            No
                        </CommonButton>
                        <CommonButton className='w-50' onClick={claimRewards}>
                            Yes
                        </CommonButton>
                    </div>
                </div>
            </CommonModal>
        </>
    );
};

export default WithdrawalRewards;
