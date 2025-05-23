import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { IoClose } from 'react-icons/io5';
import './commonCanvas.scss';

interface CommonCanvasProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
    width?: string; // optional width prop (default: '580px')
    title?: string;
}

const CommonCanvas: React.FC<CommonCanvasProps> = ({
    show,
    onClose,
    children,
    width = '580px',
    title
}) => {
    const offcanvasRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!offcanvasRef.current || !backdropRef.current) return;

        if (show) {
            offcanvasRef.current.style.display = 'block';
            backdropRef.current.style.display = 'block';

            gsap.fromTo(offcanvasRef.current, { x: '100%' }, { x: 0, duration: 0.5, ease: 'power3.out' });
            gsap.to(backdropRef.current, { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
        } else {
            gsap.to(offcanvasRef.current, {
                x: '100%',
                duration: 0.3,
                ease: 'power3.in',
                onComplete: () => {
                    if (offcanvasRef.current) offcanvasRef.current.style.display = 'none';
                }
            });
            gsap.to(backdropRef.current, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    if (backdropRef.current) backdropRef.current.style.display = 'none';
                }
            });
        }
    }, { dependencies: [show] });

    return (
        <>
            <div
                className="offcanvas-backdrop"
                ref={backdropRef}
                onClick={onClose}
                style={{ display: 'none', opacity: 0, backgroundColor: 'rgba(15, 23, 42, 0.8)' }}
            />

            <div
                className="offcanvas-wrapper"
                ref={offcanvasRef}
                style={{ width }}
            >
                <div className="offcanvas-close-icon" onClick={onClose}>
                    <IoClose />
                </div>
                {title && <h4 className="canvas-title">{title}</h4>}
                <div className="canvas-body">{children}</div>
            </div>
        </>
    );
};

export default CommonCanvas;
