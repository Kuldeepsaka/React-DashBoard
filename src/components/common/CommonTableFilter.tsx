import React from 'react';
import CommonInput from './commonInput';
import { FaSearch } from 'react-icons/fa';
import './commonTableFilter.scss';

interface CommonTableFilterProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const CommonTableFilter: React.FC<CommonTableFilterProps> = ({
    searchQuery,
    setSearchQuery
}) => {
    return (
        <div className="custom-search ms-auto">
            <div className="search-icon"><FaSearch /></div>
            <CommonInput
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
};

export default CommonTableFilter;
