import React from 'react';
import CommonTabs from '../../components/common/CommonTabs';
import WithdrawalRewards from './withdrawalsChild/WithdrawalRewards';  // Corrected import path
import WithdrawalHistory from './withdrawalsChild/WithdrawalHistory'; // Corrected import path
import './withDrawals.scss'
const Withdrawals: React.FC = () => {

    const [searchQuery, setSearchQuery] = React.useState(""); // Search query state

    const tabs = [
        { label: 'Rewards', component: (<WithdrawalRewards />) },
        { label: 'History', component: (<WithdrawalHistory />) },
    ];

    return (
        <div className="page-wrapper">
            <CommonTabs
                tabs={tabs}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                showSearch={false}
                showButton={true}
                buttonLabel="Withdrawals"
                onButtonClick={() => console.log('Button clicked!')}
                buttonClassName="Withdrawal-btn"
            />
        </div>
    );
};

export default Withdrawals;
