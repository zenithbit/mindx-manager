import React from 'react';
import { Columns, Obj } from '@/global/interface';
import { Gender, ResultInterview, RoundProcess, StatusProcessing } from '@/global/enum';
import { calculateAge, generateRowDataForMergeRowSingleField, uuid } from '@/utils';
import { useGetListDataRecruitment } from '@/utils/hooks';
import Table from '@/components/Table';
import styles from '@/styles/Overview.module.scss';

const countTime = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate); // Ngày bắt đầu
    start.setHours(0, 0, 0, 0)
    const end = new Date(endDate);   // Ngày kết thúc
    end.setHours(0, 0, 0, 0);
    const timeDifference = end.getTime() - start.getTime();
    const numberOfDays = timeDifference / (24 * 60 * 60 * 1000);
    return numberOfDays;
}
const TableIndex = () => {
    const listCandidate = useGetListDataRecruitment();
    const getDataListCandidate = ((listCandidate.data.response?.data as Obj)?.listData as Obj[]) || [];
    const mapDataTableIndex = {
        NOPROCESS: 0,
        FAILCV: 0,
        FAILPV: 0,
        PENDINGPV: 0,
        PASSPV: 0
    }
    const getGender: Record<Gender, number> = {
        FEMALE: 0,
        MALE: 0,
        NA: 0
    }
    const averageTimeProcess = {
        TIME: 0,
        COUNTTIME: 0
    };
    const calcAge = getDataListCandidate.reduce((value, item) => {
        const createdAt = new Date(item.createdAt);
        getGender[item.gender as Gender]++;
        if (item.statusProcess === StatusProcessing.NOPROCESS) {
            mapDataTableIndex['NOPROCESS']++;
            averageTimeProcess['TIME'] += countTime(createdAt, new Date());
            averageTimeProcess['COUNTTIME']++;
        }
        if (item.roundProcess === RoundProcess.CV && StatusProcessing.DONE) {
            if (item.result === ResultInterview.NOTPASS) {
                averageTimeProcess['TIME'] += countTime(createdAt, item.failCVDate || new Date());
                averageTimeProcess['COUNTTIME']++;
                mapDataTableIndex['FAILCV']++;
            }
        }
        if (item.roundProcess === RoundProcess.INTERVIEW) {
            averageTimeProcess['TIME'] += countTime(createdAt, item.interviewDate || new Date());
            averageTimeProcess['COUNTTIME']++;
            switch (item.result) {
                case ResultInterview.NOTPASS:
                    mapDataTableIndex['FAILPV']++;
                    break;
                case ResultInterview.PENDING:
                    mapDataTableIndex['PENDINGPV']++;
                    break
            }
        }
        if (item.roundProcess !== RoundProcess.CV && item.roundProcess !== RoundProcess.INTERVIEW) {
            mapDataTableIndex['PASSPV']++;
        }
        return {
            dob: calculateAge(item.dob as Date) + value.dob
        }
    }, {
        dob: 0
    });
    const columns: Columns = [
        {
            title: 'TT',
            dataIndex: 'tt',
            className: 'text-center',
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                    className: `${styles.title} ${data.className as string}`
                }
            }

        },
        {
            title: 'NỘI DUNG',
            dataIndex: 'info',
            className: 'text-center',
            render(value) {
                return value.content
            },
            onCell(data) {
                return {
                    className: data.className as string
                }
            }
        },
        {
            title: 'SỐ LƯỢNG',
            dataIndex: 'info',
            className: 'text-center',
            render(value) {
                return value.total
            },
            onCell(data) {
                return {
                    className: data.className as string
                }
            }
        },
        {
            title: 'TỈ LỆ',
            dataIndex: 'info',
            className: 'text-center',
            render(value) {
                return value.rate
            },
            onCell(data) {
                return {
                    className: data.className as string
                }
            }
        }
    ];
    const evulate = [
        {
            tt: 'Đánh giá',
            info: [
                {
                    content: 'Pass PV',
                    total: mapDataTableIndex['PASSPV'],
                    rate: `${Number(mapDataTableIndex.PASSPV / getDataListCandidate.length * 100 || 0).toFixed(2)}%`,
                },
                {
                    tt: 'ĐÁNH GIÁ',
                    content: 'Đang hẹn PV/Chờ KQ',
                    total: mapDataTableIndex['PENDINGPV'],
                    rate: `${Number(mapDataTableIndex.PENDINGPV / getDataListCandidate.length * 100 || 0).toFixed(2)}%`
                },

            ],
            className: `${styles.green} green`
        },
        {
            tt: '',
            info: [
                {
                    key: uuid(),
                    content: 'Chưa xử lý',
                    total: mapDataTableIndex.NOPROCESS,
                    rate: `${Number(mapDataTableIndex.NOPROCESS / getDataListCandidate.length * 100 || 0).toFixed(2)}%`
                },
            ],
            className: styles.orange
        },
        {
            tt: 'Từ chối',
            info: [
                {
                    content: 'CV Không đạt',
                    total: mapDataTableIndex['FAILCV'],
                    rate: `${Number(mapDataTableIndex.FAILCV / getDataListCandidate.length * 100 || 0).toFixed(2)}%`
                },
                {
                    content: 'Fail PV',
                    total: mapDataTableIndex['FAILPV'],
                    rate: `${Number(mapDataTableIndex.FAILPV / getDataListCandidate.length * 100 || 0).toFixed(2)}%`
                }
            ],
            className: styles.red
        },
        {
            tt: 'Tổng',
            info: [
                {
                    total: getDataListCandidate.length
                }
            ]
        }
        || 0]
    const data = generateRowDataForMergeRowSingleField(evulate, 'info');
    return (
        <div className={`${styles.tableIndex}`}>
            <table className={styles.tableTotal}>
                <thead>
                    <tr>
                        <th rowSpan={4} className={styles.totalCandiate}>
                            {getDataListCandidate.length}
                        </th>
                        <th rowSpan={2} className={`${styles.bdLeft} ${styles.bdBottom}`}>Nam: {getGender.MALE}</th>
                        <th rowSpan={4} className={`${styles.bdLeft} text-center ${styles.avgProcess}`}>{Number(averageTimeProcess['TIME'] / averageTimeProcess['COUNTTIME'] || 0).toFixed(2)} Ngày</th>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                        <th rowSpan={2} className={styles.ageAvg}>Độ tuổi TB: {Number((calcAge.dob / getDataListCandidate.length) || 0).toFixed(2)}</th>
                        <th rowSpan={2}>Nữ: {getGender.FEMALE}</th>
                    </tr>
                    <tr>
                    </tr>
                </thead>
                <tbody>
                    <tr className={styles.title}>
                        <td colSpan={2}>
                            Tổng dữ liệu ứng viên
                        </td>
                        <td>
                            Thời gian xử lý TB
                        </td>
                    </tr>
                </tbody>
            </table>
            <Table
                bordered
                className={`${styles.table} noSetBgColorHover`}
                disableDefaultPagination
                rowData={data}
                columns={columns}
            />
        </div>
    )
}

export default TableIndex;