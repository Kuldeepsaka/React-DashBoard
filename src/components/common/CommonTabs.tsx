import React, { useRef, useState } from 'react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import CommonInput from './commonInput';
import CommonButton from './CommonButton';
import { FaSearch } from 'react-icons/fa';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './commonTabs.scss';

interface TabProps {
    label: string;
    component: JSX.Element;
}

interface CommonTabsProps {
    tabs: TabProps[];
    searchQuery?: string;
    setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
    showSearch?: boolean;
    showButton?: boolean;
    buttonLabel?: string;
    onButtonClick?: () => void;
    buttonClassName?: string;
    tabType?: 'primary' | 'child';
}

const CommonTabs: React.FC<CommonTabsProps> = ({
    tabs,
    searchQuery,
    setSearchQuery,
    showSearch = true,
    showButton = false,
    buttonLabel = 'Action',
    onButtonClick,
    buttonClassName = '',
    tabType = 'primary'
}) => {
    const [activeKey, setActiveKey] = useState<string>(tabs[0].label);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (contentRef.current) {
            gsap.fromTo(
                contentRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            );
        }
    }, [activeKey]); // Re-run GSAP animation when tab changes

    return (
        <Tab.Container activeKey={activeKey} onSelect={(k) => k && setActiveKey(k)}>
            <Row>
                <Col sm={12} md={6}>
                    <Nav className={`d-flex mb-3 ${tabType === 'child' ? 'child-nav' : 'custom-nav'}`}>
                        {tabs.map((tab) => (
                            <Nav.Item key={tab.label}>
                                <Nav.Link eventKey={tab.label}>{tab.label}</Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                </Col>

                {(showSearch || showButton) && (
                    <Col sm={12} md={6} className="mb-3 d-flex justify-content-end align-items-center gap-2">
                        {showSearch && searchQuery !== undefined && setSearchQuery && (
                            <div className="custom-search">
                                <div className="search-icon"><FaSearch /></div>
                                <CommonInput
                                    type="text"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        )}
                        {showButton && (
                            <CommonButton className={buttonClassName} onClick={onButtonClick}>
                                {buttonLabel}
                            </CommonButton>
                        )}
                    </Col>
                )}
                <Col sm={12}>
                    <Tab.Content>
                        {tabs.map((tab) => (
                            <Tab.Pane eventKey={tab.label} key={tab.label}>
                                {activeKey === tab.label && (
                                    <div ref={contentRef}>
                                        {tab.component}
                                    </div>
                                )}
                            </Tab.Pane>
                        ))}
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
};

export default CommonTabs;
