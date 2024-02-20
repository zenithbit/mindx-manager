import React from 'react';
import { Tooltip } from 'antd';
import Image from 'next/image';
import { Obj } from '@/global/interface';
import styles from '@/styles/Document.module.scss';

interface Props {
    active?: boolean;
    data?: Obj;
    onClick?: () => void;
    isToggle?: boolean;
}
const BlockDocument = (props: Props) => {
    return (
        props.isToggle ?
            <Tooltip trigger={"hover"} title={<div className={styles.tooltip}>
                <p><b>Mô tả</b>: {props.data?.docDescribe}</p>
            </div>} placement={"right"} color="white" overlayClassName={styles.tooltip}>
                <div className={`${styles.blockDocument} ${props.active ? styles.active : ''}`} onClick={props.onClick}>
                    <div className={styles.imageDoc}>
                        <Image alt='' src={"/static/doc-image.png"} width={20} height={20} />
                    </div>
                    <div className={styles.title}>
                        <p className={styles.docName}>{props.data?.docTitle}</p>
                    </div>
                </div>
            </Tooltip> :
            <div className={`${styles.blockDocument} ${props.active ? styles.active : ''}`} onClick={props.onClick}>
                <div className={styles.imageDoc}>
                    <Image alt='' src={"/static/doc-image.png"} width={20} height={20} />
                </div>
                <div className={styles.title}>
                    <p className={styles.docName}>{props.data?.docTitle}</p>
                    <p>{props.data?.docDescribe}</p>
                </div>
            </div>
    )
}

export default BlockDocument;