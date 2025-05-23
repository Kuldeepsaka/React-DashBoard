// components/common/TabHeader.tsx

import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'; // Importing the search icon from react-icons
import CommonInput from './commonInput';

interface TabHeaderProps {
    tabs: string[];
    activeKey: string;
    onSelect: (key: string) => void;
    searchValue: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TabHeader: React.FC<TabHeaderProps> = ({ tabs, activeKey, onSelect, searchValue, onSearchChange }) => {
    return (
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <Nav variant="pills" activeKey={activeKey} onSelect={(k) => k && onSelect(k)}>
                {tabs.map((tab) => (
                    <Nav.Item key={tab}>
                        <Nav.Link eventKey={tab}>{tab}</Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
            <div className='cusotm-search'>
                <span><FaSearch /></span>
                <CommonInput className="data-search"  placeholder="Search..." value={searchValue} onChange={onSearchChange} />
            </div>

        </div>
    );
};

export default TabHeader;
