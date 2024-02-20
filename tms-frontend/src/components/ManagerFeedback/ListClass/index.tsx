import React, { useEffect, useState } from 'react';
import { Input, Switch, Checkbox, DatePicker, Radio } from 'antd';
import { CheckCircleOutlined, CheckOutlined, CloseCircleOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { Columns, Obj, RowData } from '@/global/interface';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON } from '@/global/enum';
import { formatDatetoString } from '@/utils';
import { useDebounce, useGetListClassFeedback, useUpdateClassFeedback } from '@/utils/hooks';
import Table from '@/components/Table';
import styles from '@/styles/feedback/Feedback.module.scss';

const ListClass = () => {
    const dataListClass = useGetListClassFeedback();
    const [fieldFilter, setFieldFilter] = useState<{
        codeClassText: string;
        time: number[];
        date: {
            month: number;
            year: number;
        };
        enabled: boolean[];
        done: boolean;
    }>({
        codeClassText: '',
        time: [1],
        date: {
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
        },
        enabled: [true, false],
        done: false
    });
    const debounce = useDebounce(fieldFilter, 500);
    const updateClass = useUpdateClassFeedback();
    const hanldeChangeFilter = (fields: string, value: string | number[] | boolean[] | number | boolean | Obj) => {
        setFieldFilter({
            ...fieldFilter,
            [fields]: value
        });
    }
    useEffect(() => {
        const fields: Array<string> = ['codeClassText', '_id', 'date', 'done', 'enabled', 'numberCollected', 'time'];
        dataListClass.query(debounce.date.month, fields, fieldFilter);
    }, [debounce]);
    useEffect(() => {
        if (updateClass.success) {
            const fields: Array<string> = ['codeClassText', '_id', 'date', 'done', 'enabled', 'numberCollected', 'time'];
            dataListClass.query(fieldFilter.date.month, fields, fieldFilter);
            updateClass.clear();
        }
    }, [updateClass, fieldFilter]);
    const columns: Columns = [
        {
            key: 'CODE_CLASS',
            dataIndex: 'codeClassText',
            title: 'Mã lớp',
            render(value, record, index) {
                return value;
            },
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            },
            filterDropdown(props) {
                return <Input className="inputAntd" placeholder="Tìm kiếm mã lớp" value={fieldFilter.codeClassText} onChange={(e) => {
                    hanldeChangeFilter('codeClassText', e.target.value);
                }} />
            },
            filterIcon: <SearchOutlined />
        },
        {
            key: 'TIMECOLLECT',
            dataIndex: 'time',
            title: `Lần (${fieldFilter.time})`,
            className: 'text-center',
            render(value, record, index) {
                return value as string
            },
            filterDropdown(props) {
                return <div className={styles.selectTime}>
                    <Checkbox.Group className={styles.checkboxGroup} defaultValue={[1]} onChange={(checkedValue) => {
                        hanldeChangeFilter('time', checkedValue as Array<number>)
                    }}>
                        <Checkbox value={1}>
                            Lần 1
                        </Checkbox>
                        <Checkbox value={2}>
                            Lần 2
                        </Checkbox>
                    </Checkbox.Group>
                </div>
            },
        },
        {
            key: 'DATE',
            dataIndex: 'date',
            title: `Ngày lấy  (${fieldFilter.date.month ? `Tháng ${fieldFilter.date.month}` : 'Chưa chọn'})`,
            render(value) {
                return formatDatetoString(value as Date || new Date(), 'dd/MM/yyyy') || '';
            },
            filterDropdown: (props) => {
                return <DatePicker size={'middle'} picker="month" placeholder="Tháng" onChange={((day) => {
                    hanldeChangeFilter('date', {
                        month: (day as unknown as Obj)?.$M as number + 1,
                        year: (day as unknown as Obj)?.$y as number,
                    })
                })} />
            },
            filterIcon: MapIconKey[KEY_ICON.TIMESCHEDULE],
            width: 200
        },
        {
            key: 'RATE',
            dataIndex: '',
            // (pending)
            title: 'Tỉ lệ',
            render(value, record) {
                return !record.enabled ? 'Chưa triển khai' : `0%`
            },
            filterDropdown(props) {
                return <Radio.Group className={styles.option}>
                    <Radio value={'GTE'}>{'>='} 50%</Radio>
                    <Radio value={'LTE'}>{'<'} 50%</Radio>
                </Radio.Group>
            },
        },
        {
            key: 'ENABLED',
            dataIndex: 'enabled',
            title: 'Triển khai',
            className: `${styles.status} text-center`,
            render(value, record) {
                return <Switch
                    disabled={record.done as boolean}
                    className={styles.switch}
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    checked={value as boolean}
                    onChange={(checked) => {
                        updateClass.query(record._id as string, 'enabled', checked);
                    }}
                />
            },
            filterDropdown(props) {
                return <div className={styles.selectTime}>
                    <Checkbox.Group className={styles.checkboxGroup} defaultValue={fieldFilter.enabled} onChange={(checkedvalue) => {
                        hanldeChangeFilter('enabled', checkedvalue as Array<boolean>);
                    }}>
                        <Checkbox value={true}>
                            Đã triển khai
                        </Checkbox>
                        <Checkbox value={false}>
                            Chưa triển khai
                        </Checkbox>
                    </Checkbox.Group>
                </div>
            },
        },
        {
            key: 'DONE',
            dataIndex: 'done',
            title: `${fieldFilter.done ? 'Hoàn thành' : 'Chưa hoàn thành'}`,
            render(value, record) {
                return <div className={styles.actionChecked}>
                    <CheckCircleOutlined onClick={() => {
                        updateClass.query(record._id as string, 'done', true);
                    }}
                        className={`${value ? styles.active : styles.deactive} ${styles.iconCheck}`} />
                    <CloseCircleOutlined
                        onClick={() => {
                            updateClass.query(record._id as string, 'done', false);
                        }}
                        className={`${!value ? styles.active : styles.deactive} ${styles.iconCheck}`} />
                </div>
            },
            width: 150,
            filterDropdown(props) {
                return <Radio.Group className={styles.option} defaultValue={fieldFilter.done} onChange={(e) => {
                    hanldeChangeFilter('done', Boolean(e.target.value));
                }}>
                    <Radio value={false}>Chưa hoàn thành</Radio>
                    <Radio value={true}>Đã hoàn thành</Radio>
                </Radio.Group>
            },
        }
    ];
    const rowData: RowData[] = (dataListClass.data.response?.data as Array<Obj>)?.map((item) => {
        return {
            ...item,
            key: item._id as string,
        }
    }) || [];
    return (
        <div className={styles.listClass}>
            <Table
                bordered
                loading={dataListClass.data.isLoading}
                disableDefaultPagination
                columns={columns}
                rowData={rowData}
            />
        </div>
    )
}

export default ListClass;