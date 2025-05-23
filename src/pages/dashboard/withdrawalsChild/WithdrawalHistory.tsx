import React, { useState } from 'react';
import { withdrawalsHistory } from '../../../components/utils/TableHeadings';
import { withdrawalsHistoryData } from '../../../components/utils/plansData';
import CommonPagination from '../../../components/common/CommonPagination';
import CommonTable from '../../../components/common/commonTable';
import CommonTableFilter from '../../../components/common/CommonTableFilter';

const WithdrawalHistory: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredData = withdrawalsHistoryData.filter(item =>
        item['Matching Rewards'].toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentData = filteredData.slice(startIdx, startIdx + itemsPerPage);

    return (
        <div className="page-wrapper px-0">
            <CommonTableFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <CommonTable tableheading={withdrawalsHistory}>
                {currentData.map((item, idx) => (
                    <tr key={idx}>
                        <td>{startIdx + idx + 1}</td>
                        <td>{item['Matching Rewards']}</td>
                        <td>{item['Level Rewards']}</td>
                        <td>{item['Staking Rewards']}</td>
                        <td>{item['Amount']}</td>
                        <td>{item['Wallet Address']}</td>
                        <td>{item['Status']}</td>
                    </tr>
                ))}
            </CommonTable>
            <CommonPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default WithdrawalHistory;
