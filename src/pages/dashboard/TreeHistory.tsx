import React, { useState } from 'react';
import CommonTableFilter from '../../components/common/CommonTableFilter';
import CommonTable from '../../components/common/commonTable';
import CommonPagination from '../../components/common/CommonPagination';
import { treeHistory } from '../../components/utils/TableHeadings';
import { treeTableData } from '../../components/utils/plansData';
import { treeTable } from '../../components/utils/tableDataTypes';
import CommonCanvas from '../../components/common/Canvas/commonCanvas';
import './TreeHistory.scss';

const TreeHistory: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showCanvas, setShowCanvas] = useState(false);
    const [selectedRow, setSelectedRow] = useState<treeTable | null>(null);
    const itemsPerPage = 10;

    const handleActionClick = (item: treeTable) => {
        setSelectedRow(item);
        setShowCanvas(true);
    };

    const handleCloseCanvas = () => {
        setShowCanvas(false);
        setSelectedRow(null);
    };

    const filteredData = treeTableData.filter(item =>
        item['Joinee Name'].toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentData = filteredData.slice(startIdx, startIdx + itemsPerPage);

    return (
        <div className="page-wrapper">
            <CommonTableFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <CommonTable tableheading={treeHistory}>
                {currentData.map((item, idx) => (
                    <tr key={idx}>
                        <td>{startIdx + idx + 1}</td>
                        <td>{item['Joinee Name']}</td>
                        <td>{item['Referral Code']}</td>
                        <td>{item['Current Staking']}</td>
                        <td>{item['Current Level']}</td>
                        <td>{item['Referred By']}</td>
                        <td onClick={() => handleActionClick(item)}>
                            <span
                                className={`action-cell ${item["Action"] === "View More"
                                    ? "text-warning"
                                    : "text-muted"
                                    }`}
                            >
                                {item["Action"]}
                            </span>
                        </td>
                    </tr>
                ))}
            </CommonTable>
            <CommonPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
            <CommonCanvas show={showCanvas} onClose={handleCloseCanvas} >
                {selectedRow && (
                    <div className='canvas-user-info'>
                        <h3>Joinee Details</h3>
                        <ul>
                            <li>
                                <p>Joinee Name: <br /><strong>{selectedRow['Joinee Name']}</strong></p>
                                <p>Referral Code: <br /><strong>{selectedRow['Referral Code']}</strong></p>
                            </li>
                            <li>
                                <p>Current Staking: <br /><strong>{selectedRow['Current Staking']}</strong></p>
                                <p>Current Level <br /><strong>{selectedRow['Current Level']}</strong></p>
                            </li>

                        </ul>
                    </div>
                )}
            </CommonCanvas>
        </div>
    );
};
export default TreeHistory;