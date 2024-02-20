import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Loading from '../loading';
import styles from '@/styles/Modal.module.scss';

interface Props {
    className?: string;
    children?: React.ReactElement;
    show?: boolean;
    disableCloseButtonHeader?: boolean;
    modalHeader?: React.ReactElement | string;
    modalFooter?: React.ReactElement | string;
    dialogClassName?: string;
    centered?: boolean;
    size?: 'sm' | 'lg' | 'xl';
    backdropClassName?: string;
    loading?: boolean;
    onHide?: () => void;
}
const ModalCustomize = (props: Props) => {
    return (
        <div className={`modalCustomize ${props.className}`}>
            <Modal
                size={props.size}
                dialogClassName={`${props.dialogClassName}`}
                show={props.show}
                onHide={props.onHide}
                backdrop="static"
                keyboard={false}
                centered={props.centered}
                backdropClassName={props.backdropClassName}
            >
                {
                    props.modalHeader && <Modal.Header closeButton={!props.disableCloseButtonHeader}>
                        <Modal.Title className={styles.modalHeader}>{props.modalHeader} {props.loading && <Loading className={styles.loading} />}</Modal.Title>
                    </Modal.Header>
                }

                <Modal.Body>
                    {
                        props.children
                    }
                </Modal.Body>
                {props.modalFooter &&
                    <Modal.Footer>
                        {props.modalFooter}
                    </Modal.Footer>}

            </Modal>
        </div>
    )
}

export default ModalCustomize;