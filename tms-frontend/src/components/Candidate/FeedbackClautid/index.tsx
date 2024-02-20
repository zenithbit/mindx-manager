import React, { useEffect, useState } from 'react';
import { Button, Tooltip, Popconfirm } from 'antd';
import Link from 'next/link';
import { Columns, Obj, RowData } from '@/global/interface';
import { formatDatetoString } from '@/utils';
import { useGetCandidateOnboard, useGetClautidForCandidateOnboard, useGetFeedbackClautid } from '@/utils/hooks';
import Loading from '@/components/loading';
import Table from '@/components/Table';
import { ClassForm } from '@/global/enum';
import ModalCustomize from '@/components/ModalCustomize';
import Feedback from './Feedback';
import ModalRegisterClass from '../ListClassRunning/ModalRegisterClass';
import styles from '@/styles/Recruitment/Candidate.module.scss';

const class1: Obj = {};
const class2: Obj = {};
const listClassIdClautid: string[] = [];
const FeedbackClautid = () => {
    const candidateInfo = useGetCandidateOnboard();
    const getCandidateInfo = (candidateInfo.data.response?.data as Array<Obj>)?.[0];
    const [showModalFeedback, setShowModalFeedback] = useState<{
        show: boolean,
        data: Obj,
        countTime: number,
        isCreate?: boolean
    }>({
        show: false,
        data: {},
        countTime: 0,
        isCreate: false
    });

    const [modalUpdateClassRegister, setModalUpdateClassregister] = useState<{
        show: boolean,
        isUpdate: boolean,
        classRegister?: Obj,
        countTime?: number
    }>({
        show: false,
        isUpdate: true,
        classRegister: undefined,
        countTime: 0
    });
    const candidateClautid = useGetClautidForCandidateOnboard();
    const getCandidateClautid = candidateClautid.data.response?.data as Obj;

    const feedbackClautid = useGetFeedbackClautid();
    const getFeedbackClautid = feedbackClautid.data.response?.data as Array<Obj>;

    const tempList: Obj[] = [];
    for (const key in getCandidateClautid) {
        if (key.includes("First")) {
            class1[key.split("First")[0]] = getCandidateClautid[key];
        } else if (key.includes("Second")) {
            class2[key.split("Second")[0]] = getCandidateClautid[key];
        }
    }

    tempList.push(class1, class2);
    tempList.forEach((item, idx) => {
        item['feedback'] = getFeedbackClautid?.[idx];
    });
    const rowData: RowData[] = tempList.map((item, idx) => {
        return {
            ...item,
            key: idx.toString()
        }
    });
    const columns: Columns = [
        {
            title: 'Lớp',
            dataIndex: 'classId',
            render(value, record, index) {
                return value?.codeClass || ''
            },
        },
        {
            title: 'Ngày dự thính',
            dataIndex: 'time',
            render(value) {
                const getStringTime = formatDatetoString(value, "iiiiii, dd/MM/yyyy");
                return getStringTime;
            }
        },
        {
            title: 'Hình thức',
            dataIndex: 'form'
        },
        {
            title: 'Cơ sở',
            dataIndex: 'location',
            render(value: Obj, record) {
                return value ? (record.form === ClassForm.ONLINE ? <a>Zoom</a> : <p>{value.locationCode} <Tooltip title={value.locationDetail}><sup className={styles.sup}>i</sup></Tooltip></p>) : ''
            }
        },
        {
            title: 'Feedback',
            dataIndex: 'feedback',
            render(value, record, index) {
                return <div className={`${styles.cell} ${value ? styles.completed : styles.pending}`} onClick={() => {
                    if (value) {
                        setShowModalFeedback({
                            show: true,
                            data: record,
                            countTime: index,
                            isCreate: false,
                        });
                    }
                }}>{value ? 'Hoàn thành' : 'Chưa có dữ liệu'}</div>
            },
            onCell() {
                return {
                    className: "text-center"
                }
            }
        },
        {
            title: 'Hành động',
            className: "text-center",
            dataIndex: 'feedback',
            render(value, record, index) {
                return value ? <div className={`${styles.cell} ${styles.completed}`}>Hoàn thành</div> :
                    <div>
                        <Button size="small" onClick={() => {
                            if (!value) {
                                setShowModalFeedback({
                                    show: true,
                                    data: record,
                                    countTime: index,
                                    isCreate: true
                                });
                            }
                        }}>Thực hiện</Button>
                        <Popconfirm
                            okButtonProps={{
                                className: styles.btnPopup
                            }}
                            cancelButtonProps={{
                                className: styles.btnPopup
                            }}
                            icon={null}
                            trigger="click"
                            title={<div className={styles.option}>
                                <p>Lựa chọn hành động cập nhật</p>
                                <Button size="small" className={styles.btnTime} onClick={() => {
                                    if (value) {
                                        setModalUpdateClassregister({
                                            isUpdate: true,
                                            show: true,
                                            classRegister: record,
                                            countTime: index
                                        });
                                    }
                                }}>Thông tin</Button>
                                <Button size="small">Đổi lớp</Button>
                            </div>}
                        >
                            <Button size="small">Cập nhật</Button>
                        </Popconfirm>
                    </div >
            },
        },
    ];
    useEffect(() => {
        candidateClautid.query({
            query: {
                candidateId: getCandidateInfo?._id
            }
        });
    }, []);
    useEffect(() => {
        if (candidateClautid.data.response && candidateClautid.data.response) {
            if (getCandidateClautid?.classIdFirst?._id) {
                listClassIdClautid.push(getCandidateClautid.classIdFirst._id as string);
            }
            if (getCandidateClautid?.classIdSecond?._id) {
                listClassIdClautid.push(getCandidateClautid.classIdSecond._id as string);
            }
            feedbackClautid.query({
                query: {
                    listCandidateId: [getCandidateInfo?._id].toString(),
                    listClassId: listClassIdClautid.toString()
                }
            });
        }
    }, [candidateInfo.data.response, candidateClautid.data.response, candidateClautid.data.response]);
    return (
        <div className={styles.feedbackClautid}>
            {candidateClautid.data.isLoading || !getCandidateClautid
                ? <Loading /> :
                <>
                    <p>Xem và đăng ký lớp dự thính tại: <Link href={'/candidate/class-running'} target="_blank"><b>Link</b></Link></p>
                    {!getCandidateClautid?.classIdFirst && <p className="error">Bạn chưa đăng ký lịch dự thính lần 1</p>}
                    {!getCandidateClautid?.classIdSecond && <p className="error">Bạn chưa đăng ký lịch dự thính lần 2</p>}
                    <Table
                        columns={columns}
                        disableDefaultPagination
                        rowData={rowData}
                    />
                </>
            }
            {
                showModalFeedback &&
                <ModalCustomize
                    modalHeader={<h2>Feedback buổi dự thính</h2>}
                    show={showModalFeedback.show}
                    onHide={() => {
                        setShowModalFeedback({
                            ...showModalFeedback,
                            show: false,
                        });
                    }}
                >
                    <Feedback
                        isCreate={showModalFeedback.isCreate}
                        closeModel={() => {
                            setShowModalFeedback({
                                ...showModalFeedback,
                                show: false,
                            });
                        }}
                        dataClass={showModalFeedback.data}
                        countTime={showModalFeedback.countTime}
                    />
                </ModalCustomize>
            }
            {
                modalUpdateClassRegister.show &&
                <ModalRegisterClass
                    title={<h2>Cập nhật thông tin dự thính</h2>}
                    showModal={modalUpdateClassRegister.show}
                    classRegister={modalUpdateClassRegister.classRegister}
                    isUpdate
                    handleShowModal={() => {
                        setModalUpdateClassregister({
                            show: false,
                            isUpdate: false,
                            classRegister: undefined
                        });
                    }}
                    countTime={modalUpdateClassRegister.countTime}
                    recordRegisterClautidId={getCandidateClautid._id}
                />
            }
        </div>
    )
}

export default FeedbackClautid;