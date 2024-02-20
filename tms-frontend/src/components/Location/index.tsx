import React, { useEffect, useState } from 'react'
import Tabs from '../Tabs';
import { TabsProps } from 'antd';
import { Columns, Obj, RowData } from '@/global/interface';
import { PositionTe } from '@/global/enum';
import { useComparePositionTE, useGetArea, useGetLocations } from '@/utils/hooks';
import ToolBar from '../Tabs/ToolBar';
import ModalCustomize from '../ModalCustomize';
import Table from '../Table';
import CreateLocation from './ModalLocation';
import ManagerLocationContext from './context';
import styles from '@/styles/class/Class.module.scss';

const columns: Columns = [
    {
        key: 'locationCode',
        dataIndex: 'locationCode',
        title: 'Mã cơ sở',

    },
    {
        key: 'locationName',
        dataIndex: 'locationName',
        title: 'Tên cơ sở',

    },
    {
        key: 'locationDetail',
        dataIndex: 'locationDetail',
        title: 'Địa chỉ',
    },
    {
        key: 'locationArea',
        dataIndex: 'area',
        title: 'Khu Vực',
        render(value: Obj) {
            return value ? value.name : ''
        },
    },
    {
        title: 'Trạng thái',
        dataIndex: 'active',
        className: 'text-center',
        render(value) {
            return <div className={`${value ? 'bgRunning' : 'bgStop'} ${styles.statusActive}`}>
                {value ? 'Hoạt động' : 'Ngưng hoạt động'}
            </div>
        },
    }
];


const Location = () => {
    const locations = useGetLocations();
    const listArea = useGetArea();
    const hasRole = useComparePositionTE(PositionTe.LEADER, PositionTe.QC, PositionTe.ASSISTANT);
    const area: TabsProps['items'] = [
        {
            key: 'ALL_Location',
            label: 'Tất cả',
        },
        ...listArea.data.response && listArea.data.response.data ? (listArea.data.response.data as Obj[]).map((item) => {
            return {
                key: item._id as string,
                label: item.name as string
            }
        }) : []
    ]
    const [location, setLocation] = useState<string>(area[0].key);

    const [openModal, setOpenModal] = useState<{
        isCreate: boolean,
        show: boolean,
        data?: Obj
    }>({
        isCreate: false,
        show: false,
        data: undefined
    });
    const rowData: RowData[] = (locations.locations?.data as Obj[])?.map((item) => {
        return {
            key: item._id as string,
            ...item
        }
    }) || [];
    const handleFilterDataByArea = () => {
        if (location === area[0].key) {
            return rowData
        } else {
            return rowData.filter((item) => item.area._id === location)
        }
    }
    useEffect(() => {
        locations.queryLocations();
        if (!listArea.data.response) {
            listArea.query();
        }
    }, []);
    return (
        <div >
            <Tabs listItemTab={area} activeKey={location} onClickTab={(key) => {
                setLocation(key);
            }} />
            {hasRole &&
                <ToolBar
                    context={ManagerLocationContext}
                    listFilter={[]}
                    createButton
                    exportCSVButton
                    onClickCreateButton={() => {
                        setOpenModal({
                            isCreate: true,
                            show: true,
                            data: undefined
                        });
                    }}
                    onClickReload={() => {
                        listArea.query();
                        locations.queryLocations();
                    }}
                    iconReload
                />
            }
            <Table
                loading={locations.state.isLoading}
                className={styles.tableMangerClass}
                columns={columns}
                rowData={handleFilterDataByArea()}
                hanldeClickRow={(record) => {
                    setOpenModal({
                        isCreate: false,
                        show: true,
                        data: record
                    });
                }}
                enableRowSelection
                disableDefaultPagination
            />
            {
                openModal.show && <ModalCustomize
                    show={openModal.show}
                    modalHeader={<h2>Thêm cơ sở</h2>}
                    onHide={() => {
                        setOpenModal({
                            isCreate: false,
                            show: false,
                            data: undefined
                        });
                    }}
                    size='lg'
                >
                    <CreateLocation isCreate={openModal.isCreate} data={openModal.data} handleModal={() => {
                        setOpenModal({
                            isCreate: false,
                            show: false,
                            data: undefined
                        });
                    }} />
                </ModalCustomize>
            }
        </div>
    )
}

export default Location;

