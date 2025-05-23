import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../store';
import { gsap } from 'gsap';
import sideBarLogo from '/assets/sidebar_Logo.png';
import classNames from 'classnames';
import { Image } from 'react-bootstrap';
import CommonButton from '../common/CommonButton';
import { DashboardIcon, Invest, LogOut, Settings, TreeHistory, WithDraw } from '../../assets/svg';
import { IoCloseSharp } from 'react-icons/io5';
import { useGSAP } from '@gsap/react';
import { useModal } from '@ebay/nice-modal-react';

interface SidebarProps {
  collapsed: boolean;
  visible: boolean;
  onToggle: () => void;
  onClose: () => void;
  onToggleMobileSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  visible,
  onToggleMobileSidebar,
}) => {
  // const user = useSelector((state: RootState) => state.auth?.user);
  // console.log(user);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isExiting, setIsExiting] = useState(false);

  const LogOutModal = useModal("LogOutModal");

  const sidebarMenu = [
    { title: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { title: 'Invest', path: '/dashboard/invest', icon: <Invest /> },
    { title: 'Tree History', path: '/dashboard/tree-history', icon: <TreeHistory /> },
    { title: 'Withdrawals', path: '/dashboard/withdrawals', icon: <WithDraw /> },
    { title: 'Settings', path: '/dashboard/settings', icon: <Settings /> },
  ];

  useGSAP(
    () => {
      if (!isExiting && visible) {
        gsap.fromTo(
          sidebarRef.current?.querySelectorAll('.sidebar-brand, .sidebar-menu-item, .sidebar-footer') ?? [],
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
        );
      }
    },
    { dependencies: [visible], scope: sidebarRef }
  );

  const handleCloseSidebar = () => {
    if (!sidebarRef.current || !onToggleMobileSidebar) return;

    setIsExiting(true);

    gsap.to(sidebarRef.current, {
      opacity: 0,
      x: -50,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        setTimeout(() => {
          setIsExiting(false);
          onToggleMobileSidebar();
          gsap.set(sidebarRef.current, { clearProps: 'all' });
        }, 400);
      },
    });
  };

  const handleMenuItemClick = () => {
    if (window.innerWidth < 992 && onToggleMobileSidebar) {
      handleCloseSidebar();
    }
  };

  const sidebarClasses = classNames('sidebar', {
    collapsed,
    show: visible,
    'is-exiting': isExiting,
  });



  const handleLogoutClick = () => {
    LogOutModal.show(); // Trigger modal open only
  };


  return (
    <aside className={sidebarClasses} ref={sidebarRef}>
      {visible && (
        <button
          className="sidebar-close-toggle"
          onClick={handleCloseSidebar}
          aria-label="Close Sidebar"
        >
          <IoCloseSharp />
        </button>
      )}

      <div className="sidebar-brand">
        <div className="brand-logo">
          <Image src={sideBarLogo} alt="Logo" />
        </div>
      </div>

      <div className="sidebar-menu">
        <div className="sidebar-menu-section">
          {sidebarMenu.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end
              className="sidebar-menu-item"
              onClick={handleMenuItemClick}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-text">{item.title}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        <CommonButton
          type="button"
          className="sidebar-logout-button"
          onClick={handleLogoutClick}
        >
          <LogOut />
          <span className="menu-text">Logout</span>
        </CommonButton>
      </div>
    </aside>
  );
};

export default Sidebar;
