import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons';
import { useComparePositionTE, useGetListDocument, useHandleDrawer } from '@/utils/hooks';
import { Obj } from '@/global/interface';
import { PositionTe } from '@/global/enum';
import BlockDocument from './BlockDocument';
import Content from './Content';
import Loading from '../loading';
import Empty from '../Empty';
import styles from '@/styles/Document.module.scss';

const Document = () => {
    const listDocument = useGetListDocument();
    const hasRole = useComparePositionTE(PositionTe.LEADER, PositionTe.QC, PositionTe.ASSISTANT);
    const drawer = useHandleDrawer();
    const handleOpenForm = () => {
        drawer.open({
            open: true,
            componentDirection: 'Document/FormDocument',
            title: "Tạo tài liệu",
            props: {
                isCreate: true
            }
        })
    }
    const getListDocument = listDocument.data.response?.data as Obj[];
    const [toggle, setToggle] = useState<boolean>(false);
    const [currentDoc, setCurrentDoc] = useState<Obj>();
    const handleClickItemDoc = (doc: Obj) => {
        setCurrentDoc(doc);
    }

    useEffect(() => {
        listDocument.query({
            query: {
                fields: '_id,docTitle,docDescribe'
            }
        });
    }, []);
    return (
        <div className={styles.documents}>
            <div className={styles.btn}>
                <Button onClick={() => {
                    listDocument.query();
                }} loading={listDocument.data.isLoading}><ReloadOutlined /></Button>&nbsp;
                {hasRole && <Button onClick={handleOpenForm}>Tạo tài liệu</Button>}
            </div>
            {listDocument.data.isLoading && !listDocument.data.response ? <Loading isCenterScreen /> :
                (getListDocument ? (getListDocument.length === 0 ? <Empty /> :
                    <div className={styles.contentMain}>
                        <div className={`${styles.listDocument} ${toggle ? styles.onToggle : ''}`}>
                            {getListDocument.map((item) => {
                                return <BlockDocument isToggle={toggle} active={currentDoc?._id === item._id} key={item._id} data={item} onClick={() => {
                                    handleClickItemDoc(item)
                                }} />
                            })}
                        </div>
                        <div className={styles.rightContentDocument}>
                            <span className={styles.arrow} onClick={() => {
                                setToggle(!toggle);
                            }}><ArrowLeftOutlined rotate={toggle ? 180 : 0} className={styles.arrowIcon} /></span>
                            <Content doc={currentDoc} isToggle={toggle} />
                        </div>
                    </div>)
                    : <Empty />
                )
            }
        </div>
    )
}

export default Document;