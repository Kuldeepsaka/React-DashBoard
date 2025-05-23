import { useModal } from '@ebay/nice-modal-react';
import React from 'react';
import { Image } from 'react-bootstrap';
import LockIcon from '../../../assets/lock.png';
import CommonButton from '../../../components/common/CommonButton';

const ChangePassword: React.FC = () => {


    const ChangePasswordForm = useModal("ChangePasswordForm");


    return (
        <div className="pt-2">
            <div className="User-info change-password col-xl-4 col-sm-7">
                <ul>
                    <li>
                        <h3 className="m-0">
                            <span>
                                <Image src={LockIcon} alt="changePassword" />
                            </span>
                            Change Password
                        </h3>
                        <p>Please choose a new password.</p>
                    </li>
                    <li>
                        <CommonButton className="w-100 cancel-btn" onClick={() => { ChangePasswordForm.show() }}>
                            Change Password
                        </CommonButton>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ChangePassword;
