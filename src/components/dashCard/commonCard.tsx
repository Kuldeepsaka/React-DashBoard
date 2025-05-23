import React, { ReactNode } from 'react';
import './CommonCard.scss';

interface CommonCardProps {

    children?: ReactNode;
    className?: string;
}

const CommonCard: React.FC<CommonCardProps> = ({

    children,
    className = ''
}) => {
    return (
        <div className={`common-card ${className}`}>
            <div className="card-body">
                {children}
            </div>
        </div>
    );
};

export default CommonCard;
