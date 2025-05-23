import React from 'react';
import Form from 'react-bootstrap/Form';
import './commonSelectBox.scss';
interface SelectBoxProps {
    id: string;
    label?: string;
    options: Array<{ value: string; label: string }>;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    isInvalid?: boolean;
    feedback?: string;
    size?: 'sm' | 'lg';
    className?: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({
    id,
    label,
    options,
    value,
    onChange,
    placeholder = 'Select',
    isInvalid,
    feedback,
    size,
    className,
}) => {
    return (
        <Form.Group className={`common-select-wrapper ${className}`}>
            {label && <Form.Label htmlFor={id}>{label}</Form.Label>}
            <Form.Select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                isInvalid={isInvalid}
                size={size}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Form.Select>
            {isInvalid && feedback && (
                <Form.Control.Feedback type="invalid">
                    {feedback}
                </Form.Control.Feedback>
            )}
        </Form.Group>
    );
};

export default SelectBox;