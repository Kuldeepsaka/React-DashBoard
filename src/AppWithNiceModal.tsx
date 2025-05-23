import React from 'react';
import { Outlet } from 'react-router-dom';
import NiceModal from '@ebay/nice-modal-react';

const AppWithNiceModal: React.FC = () => {
    return (
        <NiceModal.Provider>
            <Outlet />
        </NiceModal.Provider>
    );
};

export default AppWithNiceModal;
