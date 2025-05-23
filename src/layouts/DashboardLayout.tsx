import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import classNames from 'classnames';
import Sidebar from '../components/dashboard/Sidebar';
import CommonButton from '../components/common/CommonButton';
import Wallet from '/assets/wallet.png';
import './dashBoardLayout.scss';
import CommonCanvas from '../components/common/Canvas/commonCanvas';
import { OtherWallet, Trust } from '../assets/svg';
import { Image } from 'react-bootstrap';

const DashboardLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const location = useLocation();

  const currentYear = new Date().getFullYear();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard/invest') return 'Invest';
    if (path === '/dashboard/tree-history') return 'Tree History';
    if (path === '/dashboard/withdrawals') return 'Withdrawals';
    if (path === '/dashboard/settings') return 'Settings';
    return 'Dashboard';
  };

  const toggleSidebar = () => setSidebarCollapsed(prev => !prev);
  const toggleMobileSidebar = () => setSidebarVisible(prev => !prev);



  const [connect, setConnect] = useState(false);

  const connectWallet = () => setConnect(true);
  const disconnectWallet = () => setConnect(false);

  const headerClasses = classNames('header', { 'sidebar-collapsed': sidebarCollapsed });
  const contentClasses = classNames('dashboard-layout-content', { 'sidebar-collapsed': sidebarCollapsed });

  return (
    <div className="dashboard-layout">
      <Sidebar
        collapsed={sidebarCollapsed}
        visible={sidebarVisible}
        onToggle={toggleSidebar}
        onClose={() => setSidebarVisible(false)}
        onToggleMobileSidebar={toggleMobileSidebar}
      />
      <div
        className={classNames('sidebar-backdrop', { show: sidebarVisible })}
        onClick={() => setSidebarVisible(false)}
      />

      <div className={contentClasses}>
        <header className={headerClasses}>
          <div className="header-left">
            <button className="sidebar-toggle" onClick={toggleMobileSidebar}>
              <IoMenu />
            </button>
            <h1 className="header-title m-0">{getPageTitle()}</h1>
          </div>
          <div className="header-right">
            <CommonButton onClick={connectWallet}>
              <Image src={Wallet} alt="wallet Icon" />
              Connect Wallet
            </CommonButton>
          </div>
        </header>

        <main className="main-content">
          <Outlet />
        </main>
        <footer className="footer mt-auto">© {currentYear} EG Life - All rights reserved.</footer>
      </div>

      <CommonCanvas show={connect} onClose={disconnectWallet} title="Connect Your Wallet">

        <div className='wallet-connect'>
          <button className="btn canvas-btn" onClick={() => alert('Connecting......!')}>
            <Trust /> <span>Trust Wallet</span>
          </button>
          <button className="btn canvas-btn" onClick={() => alert('Connecting......!')}>
            <OtherWallet /> <span>Others</span>
          </button>
        </div>
      </CommonCanvas>
    </div>
  );
};

export default DashboardLayout;
