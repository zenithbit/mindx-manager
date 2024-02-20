import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { getLabelRegion } from '@/global/init';
import { Columns, Obj, RowData } from '@/global/interface';
import { Region } from '@/global/enum';
import { useCreateArea, useGetArea, useGetLocations, useUpdateArea } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import ModalCustomize from '../ModalCustomize';
import ModalArea from './ModalArea';
import Table from '../Table';
import styles from '@/styles/Location.module.scss';

const Area = () => {
    const area = useGetArea();
    const createArea = useCreateArea();
    const updateArea = useUpdateArea();
    const locations = useGetLocations();
    const [modal, setModal] = useState<{
        open: boolean,
        isCreate: boolean,
        data?: Obj
    }>({
        open: false,
        isCreate: false,
        data: undefined
    });
    const message = useHookMessage();
    const columns: Columns = [
        {
            title: 'Miền',
            dataIndex: 'region',
            render(value) {
                return getLabelRegion[value as Region] || 'Chưa có'
            }
        },
        {
            title: 'Mã khu vực',
            dataIndex: 'code'
        },
        {
            title: 'Tên khu vực',
            dataIndex: 'name'
        },
        {
            title: 'Số cơ sở',
            className: 'text-center',
            children: [
                {
                    title: 'Hoạt động',
                    dataIndex: 'active',
                    className: 'text-center',
                    render(_, record) {
                        const getListlocation = (((locations.locations?.data as Obj[]) || []) as Obj[]).filter((item) => {
                            return item.active && item.area._id === record._id
                        })
                        return getListlocation.length;
                    },
                    onCell() {
                        return {
                            className: `${styles.active}`
                        }
                    }
                },
                {
                    title: 'Ngưng Hoạt động',
                    dataIndex: 'deactive',
                    className: 'text-center',
                    render(_, record) {
                        const getListlocation = (((locations.locations?.data as Obj[]) || []) as Obj[]).filter((item) => {
                            return !item.active && item.area._id === record._id
                        })
                        return getListlocation.length;
                    },
                    onCell() {
                        return {
                            className: `${styles.deactive}`
                        }
                    }
                },
            ]
        },
        {
            title: 'Hành động',
            className: 'text-center',
            render(_, record) {
                return <div>
                    <Button style={{ marginRight: '1.2rem' }} onClick={() => {
                        setModal({
                            open: true,
                            isCreate: false,
                            data: record
                        });
                    }}>Cập nhật</Button>
                    <Button>Xoá</Button>
                </div>
            },
            width: 200
        }
    ];
    const rowData: RowData[] = (area.data.response?.data as Obj[])?.map((item) => {
        return {
            key: item._id as string,
            ...item
        }
    });
    const handleSubmit = (values: Obj) => {
        if (modal.isCreate) {
            createArea.query({
                body: values
            });
        } else {
            updateArea.query({
                body: values,
                params: [modal.data?._id as string]
            });
        }
    }
    useEffect(() => {
        if (!area.data.response) {
            area.query();
        }
        if (!locations.state.response) {
            locations.queryLocations();
        }
    }, []);
    useEffect(() => {
        if (createArea.data.response || updateArea.data) {
            if (createArea.data.success || updateArea.data.success) {
                setModal({
                    open: false,
                    isCreate: true,
                    data: undefined
                });
                area.query();
            }
            message.open({
                content: createArea.data.response?.message as string || updateArea.data.response?.message as string,
                type: createArea.data.success || updateArea.data.success ? 'success' : 'error'
            });
            createArea.clear?.();
            updateArea.clear?.();
            message.close();
        }
    }, [createArea.data, updateArea.data]);
    return (
        <div className={styles.area}>
            <div className={styles.btn}>
                <Button onClick={() => {
                    setModal({
                        open: true,
                        isCreate: true,
                        data: undefined
                    });
                }}>Thêm</Button>
            </div>
            <Table
                loading={area.data.isLoading}
                columns={columns}
                rowData={rowData}
                disableDefaultPagination
            />
            {
                modal &&
                <ModalCustomize
                    show={modal.open}
                    modalHeader={<h2>Thêm khu vực</h2>}
                    onHide={() => {
                        setModal({
                            open: false,
                            isCreate: false,
                            data: undefined
                        });
                    }}
                >
                    <ModalArea data={modal.data} isCreate={modal.isCreate} handleSubmit={handleSubmit} loading={createArea.data.isLoading} />
                </ModalCustomize>
            }
        </div>
    )
}

export default Area;