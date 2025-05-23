import React from 'react';
import CommonTabs from '../../components/common/CommonTabs';
import Profile from './settingsChild/Profile';
import ChangePassword from './settingsChild/ChangePassword';
import './Setting.scss'
const Settings: React.FC = () => {

  const tabs = [
    { label: 'Profile', component: (<Profile />) },
    { label: 'Change Password', component: (<ChangePassword />) },
  ];

  return (

    <div className="page-wrapper">
      <CommonTabs tabs={tabs} />
    </div>
  );
};

export default Settings;