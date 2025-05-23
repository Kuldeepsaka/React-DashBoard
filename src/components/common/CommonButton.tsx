import React from 'react';
import './CommonButton.scss';

interface CommonButtonProps {
    type?: 'button' | 'submit' | 'reset';
    children: React.ReactNode;
    disabled?: boolean;
    isLoading?: boolean;
    onClick?: () => void;
    className?: string;
}

const CommonButton: React.FC<CommonButtonProps> = ({
    type = 'button',
    children,
    disabled = false,
    isLoading = false,
    onClick,
    className = '',
}) => {
    return (
        <button
            type={type}
            className={`common-btn ${className} ${isLoading ? 'loading' : ''}`}
            disabled={disabled || isLoading}
            onClick={onClick}
        >
            <span>{isLoading ? 'Signing In...' : children}</span>
        </button>
    );
};

export default CommonButton;
