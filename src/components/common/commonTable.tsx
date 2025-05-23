// components/common/CommonTable.tsx
import React from 'react';
import { Table } from 'react-bootstrap';
import './commonTable.scss';

interface CommonTableProps {
    tableheading: { theadtitle: string }[]; // Table headings
    children?: React.ReactNode; // Custom rows passed as children
}

const CommonTable: React.FC<CommonTableProps> = ({
    tableheading,
    children,
}) => {
    return (
        <div className="common-table">
            <Table hover responsive>
                <thead className="table-dark">
                    <tr>
                        {tableheading.map((heading, index) => (
                            <th key={index}>{heading.theadtitle}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {children} {/* Render custom rows passed via children */}
                </tbody>
            </Table>
        </div>
    );
};

export default CommonTable;
