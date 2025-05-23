import NiceModal from '@ebay/nice-modal-react';
import ChangePasswordModal from './components/common/Modals/ChangePasswordModal';
import WithDrawClaimModal from './components/common/Modals/WithDrawClaimModal';
import InvestmentModal from './components/common/Modals/InvestmentModal';
import OtpModal from './components/common/Modals/authModals/OtpModal';
import ResetPasswordModal from './components/common/Modals/authModals/ResetPasswordModal';
import SuccessModal from './components/common/Modals/authModals/SuccessModal';
import LogOutModal from './components/common/Modals/authModals/LogOutModal';
// import SuccessModal from './components/forgotPassword/SuccessModal';

// Register multiple modals with unique names
NiceModal.register('ChangePasswordForm', ChangePasswordModal);
NiceModal.register('WithDrawClaimModal', WithDrawClaimModal);
NiceModal.register('InvestmentModal', InvestmentModal);
NiceModal.register('OtpModal', OtpModal);
NiceModal.register('ResetPasswordModal', ResetPasswordModal);
NiceModal.register('SuccessModal', SuccessModal);
NiceModal.register('LogOutModal', LogOutModal);


