import React from 'react';
import { Modal } from 'react-bootstrap';
import './commonModal.scss';

interface CommonModalProps {
    show: boolean;
    onHide: () => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    centered?: boolean;
    backdrop?: boolean | 'static'; // make it dynamic
    keyboard?: boolean;            // make keyboard dynamic too (optional)
}


const CommonModal: React.FC<CommonModalProps> = ({
    show,
    onHide,
    title,
    children,
    footer,
    centered = true,
    backdrop = true,     // default true
    keyboard = true      // default true
}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered={centered}
            className="common-modal fade"
            backdrop={backdrop}
            keyboard={keyboard}
            animation={true} // enable bootstrap animation
        >

            <Modal.Header closeButton>
                {title && (
                    <Modal.Title>{title}</Modal.Title>
                )}
            </Modal.Header>

            <Modal.Body>{children}</Modal.Body>
            {footer && <Modal.Footer>{footer}</Modal.Footer>}
        </Modal>
    );
};

export default CommonModal;
