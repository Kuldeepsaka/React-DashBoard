import React, { useRef, useState } from 'react';
import './OtpInput.scss';

interface OtpInputProps {
    length?: number;
    onComplete?: (otp: string) => void;
    onChange?: (otp: string) => void;
    resendLink?: string;
}

const OtpInput: React.FC<OtpInputProps> = ({
    length = 6,
    onComplete,
    onChange,
    resendLink = '/forgot-password',
}) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const focusInput = (index: number) => {
        inputRefs.current[index]?.focus();
    };

    const handleOtpChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (!value) return;

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);
        onChange?.(updatedOtp.join(''));

        if (updatedOtp.every((digit) => digit !== '')) {
            onComplete?.(updatedOtp.join(''));
        }

        if (index < length - 1) {
            focusInput(index + 1);
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === 'Backspace') {
            const updatedOtp = [...otp];
            if (updatedOtp[index]) {
                updatedOtp[index] = '';
                setOtp(updatedOtp);
                onChange?.(updatedOtp.join(''));
            } else if (index > 0) {
                focusInput(index - 1);
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            focusInput(index - 1);
        } else if (e.key === 'ArrowRight' && index < length - 1) {
            focusInput(index + 1);
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const paste = e.clipboardData.getData('text').slice(0, length).replace(/\D/g, '');
        if (paste.length === 0) return;

        const newOtp = paste.split('').slice(0, length);
        const filledOtp = Array(length).fill('').map((_, i) => newOtp[i] || '');

        setOtp(filledOtp);
        onChange?.(filledOtp.join(''));
        if (filledOtp.every((digit) => digit !== '')) {
            onComplete?.(filledOtp.join(''));
        }

        const nextIndex = newOtp.length < length ? newOtp.length : length - 1;
        focusInput(nextIndex);
    };

    return (
        <>
            <div className="otp-grid mb-2">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        id={`otp-${index}`}
                        className="form-control text-center"
                        type="text"
                        value={digit}
                        maxLength={1}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        ref={(el) => (inputRefs.current[index] = el)}
                    />
                ))}
            </div>

            <div className="d-flex justify-content-end align-items-center mb-2">
                <span className="form-note form-text-bottom d-flex gap-2">
                    Didn’t receive the OTP?{' '}
                    <a href={resendLink} className="form-note m-0">
                        Send Again
                    </a>
                </span>
            </div>
        </>
    );
};

export default OtpInput;
