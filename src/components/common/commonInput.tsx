import React from 'react';
import './commonInput.scss';

interface CommonInputProps {
    label?: string;
    placeholder?: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // <-- Add onBlur prop here
    icon?: React.ReactNode;
    name?: string;
    id?: string;
    disabled?: boolean;
    className?: string;
    feedback?: string;
    rightContent?: React.ReactNode;
    maxLength?: number;
    onIconClick?: () => void;
    pattern?: string;  // Add pattern prop
    title?: string;    // Add title prop
    feedbackClass?: string; // <-- Add feedbackClass prop

}

const CommonInput: React.FC<CommonInputProps> = ({
    label,
    placeholder,
    type = 'text',
    value,
    onChange,
    onBlur,  // <-- Destructure onBlur here
    icon,
    name,
    id,
    disabled = false,
    className = '',
    feedback,
    rightContent,
    onIconClick,
    maxLength,
    pattern,
    title,
    feedbackClass
}) => {
    return (
        <div className={`common-input ${className}`}>
            {label && <label htmlFor={id}>{label}</label>}
            <div className="input-wrapper">
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur} // <-- Apply onBlur here
                    name={name}
                    id={id}
                    disabled={disabled}
                    className={`form-control ${className}`}
                    maxLength={maxLength}
                    pattern={pattern}      // Pass pattern to input
                    title={title}          // Pass title to input
                />
                {icon && (
                    <span className="input-icon" onClick={onIconClick}>
                        {icon}
                    </span>
                )}
                {rightContent && <div className="input-right ms-2">{rightContent}</div>}
            </div>
            {feedback && (
                <div className={`form-text ${feedbackClass}`}>{feedback}</div> // Apply feedbackClass for color styling
            )}
        </div>
    );
};

export default CommonInput;
