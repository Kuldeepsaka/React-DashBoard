import React from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './CommonPagination.scss';

interface CommonPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const CommonPagination: React.FC<CommonPaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const renderPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) pages.push('...');
            pages.push(totalPages);
        }

        return pages.map((page, idx) =>
            typeof page === 'number' ? (
                <Button
                    key={idx}
                    onClick={() => onPageChange(page)}
                    className={currentPage === page ? 'active-page' : ''}
                >
                    {page}
                </Button>
            ) : (
                <span key={idx} className="mx-1 text-white">
                    {page}
                </span>
            )
        );
    };

    return (
        <div className="pagination-controls">
            <Button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <FaArrowLeft />
            </Button>

            {renderPageNumbers()}

            <Button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <FaArrowRight />
            </Button>
        </div>
    );
};

export default CommonPagination;
