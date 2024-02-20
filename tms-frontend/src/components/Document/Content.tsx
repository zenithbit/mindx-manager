import React, { useEffect } from 'react';
import { Popconfirm } from 'antd';
import { DeleteOutlined, EditFilled } from '@ant-design/icons';
import { Obj } from '@/global/interface';
import { PositionTe } from '@/global/enum';
import { formatDatetoString } from '@/utils';
import { useComparePositionTE, useDeleteDocument, useGetListDocument, useHandleDrawer, usetGetDetailDoc } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import Loading from '../loading';
import styles from '@/styles/Document.module.scss';

interface Props {
    doc?: Obj;
    isToggle?: boolean;
}
const Content = (props: Props) => {
    const message = useHookMessage();
    const hasRole = useComparePositionTE(PositionTe.LEADER, PositionTe.QC, PositionTe.ASSISTANT);
    const drawer = useHandleDrawer();
    const currentDoc = usetGetDetailDoc();
    const getRoleTe = useComparePositionTE(PositionTe.LEADER, PositionTe.ASSISTANT, PositionTe.QC);
    const getCurrentDoc = currentDoc.data.response?.data as Obj;
    const deleteDoc = useDeleteDocument();
    const listDocument = useGetListDocument();
    const handleOpenForm = () => {
        drawer.open({
            open: true,
            componentDirection: 'Document/FormDocument',
            props: {
                doc: props.doc,
            },
            title: <div className={styles.titleDrawerUpdate}>
                {props.doc?.docTitle}
                <Popconfirm
                    title="Xác nhận xoá?"
                    onConfirm={() => {
                        deleteDoc.query({
                            params: [props.doc?._id as string]
                        });
                    }}
                >
                    <DeleteOutlined className={styles.iconDelete} />
                </Popconfirm>
            </div>
        })
    }
    useEffect(() => {
        if (deleteDoc.data.response) {
            message.open({
                content: deleteDoc.data.response?.message as string,
                type: deleteDoc.data.success ? 'success' : 'error'
            });
            if (deleteDoc.data.success) {
                listDocument.query();
                drawer.close();
            }
            deleteDoc.clear?.();
            message.close();
        }
    }, [deleteDoc.data]);
    useEffect(() => {
        if ((props.doc && getCurrentDoc?._id !== props.doc?._id)) {
            currentDoc.query({
                params: [props.doc?._id as string]
            });
        }
    }, [props.doc, getCurrentDoc]);
    return (
        <div className={styles.contentDocument}>
            {
                (currentDoc.data.isLoading || (getCurrentDoc && props.doc && getCurrentDoc._id !== props.doc!._id)) ? <Loading isCenterScreen /> : ((props.doc && getCurrentDoc) ? <div className={`${styles.viewContent} ${props.isToggle ? styles.onToggle : ''}`}>
                    {hasRole && <EditFilled className={styles.editIcon} onClick={() => {
                        handleOpenForm()
                    }} />}
                    {props.isToggle && <>
                        <p className={styles.docName}>Tài liệu: <b>{getCurrentDoc.docTitle}</b></p>
                        <p>Mô tả: <b>{getCurrentDoc.docDescribe}</b></p>
                    </>}
                    {getRoleTe && <p>Share: {(getCurrentDoc.role as Obj[]).map((item, idx) => {
                        return `${item}${idx < (Object.keys(getCurrentDoc.role).length - 1) ? ', ' : ''}`
                    })}</p>}
                    <p>Trạng thái: {getCurrentDoc.active ? 'Triển khai' : 'Ngừng triển khai'}</p>
                    <p>Cập nhật: {formatDatetoString(getCurrentDoc.updatedAt as string, 'MM/yyyy')}</p>
                    <p>Link tài liệu: {getCurrentDoc.linkDoc ? <a target="_blank" href={getCurrentDoc.linkDoc}>Link</a> : 'Đang cập nhật'}</p>
                    {
                        getCurrentDoc.linkDoc && <div className={styles.preview}>
                            <iframe src={getCurrentDoc.linkDoc} className={styles.linkPreview} />
                        </div>
                    }
                </div> : <div>Hãy chọn tài liệu để xem nội dung</div>
                )
            }
        </div>
    )
}

export default Content;