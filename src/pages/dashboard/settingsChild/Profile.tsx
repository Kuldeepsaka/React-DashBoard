import React from 'react';

const Profile: React.FC = () => {
    return (
        <div className="profile-tab pt-2">
            <div className='User-info col-xl-4 col-sm-7'>
                <ul>
                    <li>
                        <p>Joinee Name: <br /><strong>Add Name</strong></p>
                        <p>Referral Code: <br /><strong>2323hj3oj43gkh3f3k43</strong></p>
                    </li>
                    <li>
                        <p>Current Staking: <br /><strong>5,000</strong></p>
                        <p>Current Level <br /><strong>Level 4</strong></p>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default Profile;
