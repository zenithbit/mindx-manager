import React, { useEffect, useState } from 'react';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON, TypeCount } from '@/global/enum';
import styles from '@/styles/Pagination.module.scss';

interface Props {
    rowOnPage?: number;
    crrPage?: number;
    className?: string;
    showSizePage?: boolean;
    maxPage: number;
    onChangePagination?: (data: {
        currentPage: number,
        currentTotalRowOnPage: number
    }) => void;
}
const Pagination = (props: Props) => {
    const [crrDataPagination, setCrrDataPagination] = useState({
        rowOnPage: props.rowOnPage || 10,
        crrPage: props.crrPage || 1,
        stepPage: 1
    });
    const handleRowOnPage = (type: TypeCount) => {
        const prevValue = crrDataPagination.rowOnPage;
        crrDataPagination.rowOnPage = (type === TypeCount.INCR ? crrDataPagination.rowOnPage + 1 : (crrDataPagination.rowOnPage > 1 ? crrDataPagination.rowOnPage - 1 : crrDataPagination.rowOnPage));
        if (prevValue !== crrDataPagination.rowOnPage) {
            setCrrDataPagination({
                ...crrDataPagination,
            });
        }
    }
    const handlePage = (type: TypeCount) => {
        const prevPage = crrDataPagination.crrPage;
        crrDataPagination.crrPage = (type === TypeCount.INCR ?
            (crrDataPagination.crrPage < props.maxPage ?
                (crrDataPagination.crrPage + 1) :
                crrDataPagination.crrPage)
            :
            (crrDataPagination.crrPage > 1 ?
                crrDataPagination.crrPage - 1 :
                (crrDataPagination.crrPage)));
        if (prevPage !== crrDataPagination.crrPage) {
            setCrrDataPagination({
                ...crrDataPagination,
            });
        }
    }
    useEffect(() => {
        props.onChangePagination?.({
            currentPage: crrDataPagination.crrPage,
            currentTotalRowOnPage: crrDataPagination.rowOnPage
        })
    }, [crrDataPagination]);
    return (
        <div className={`${styles.paginationAjax} ${props.className || ''}`}>
            <div className={styles.rowOnPage}>
                <div className={`${styles.chevronRoot} bgWhite`}>
                    <div className={styles.chevron}>
                        <div className={styles.chevronUp} onClick={() => {
                            handleRowOnPage(TypeCount.INCR);
                        }}>
                            {MapIconKey[KEY_ICON.CHEVRONU]}
                        </div>
                        <div className={styles.chevronDown} onClick={() => {
                            handleRowOnPage(TypeCount.DECR);
                        }}>
                            {MapIconKey[KEY_ICON.CHEVROND]}
                        </div>
                    </div>
                    <span>{crrDataPagination.rowOnPage < 10 ? `0${crrDataPagination.rowOnPage}` : crrDataPagination.rowOnPage}</span>
                </div>
                <span>Dòng hiển thị</span>
            </div>
            <div className={styles.pagination}>
                <div className={`${styles.prevPage} ${styles.btnHanldePage}`} onClick={() => {
                    handlePage(TypeCount.DECR);
                }}>
                    {MapIconKey[KEY_ICON.CHEVRONL]}
                </div>
                <span className={styles.currentPage}>
                    {crrDataPagination.crrPage < 10 ? `0${crrDataPagination.crrPage}` : crrDataPagination.crrPage}
                </span>
                <div className={`${styles.nextPage} ${styles.btnHanldePage}`} onClick={() => {
                    handlePage(TypeCount.INCR);
                }}>
                    {MapIconKey[KEY_ICON.CHEVRONR]}
                </div>
            </div>
            <div className={styles.stepPage}>
                <span>Trang</span>
                <div className={styles.page}>
                    <span>{crrDataPagination.crrPage < 10 ? `0${crrDataPagination.crrPage}` : crrDataPagination.crrPage}{props.showSizePage ? `/${props.maxPage}` : ''}</span>
                    <div className={styles.chevron}>
                        <div className={styles.chevronUp} onClick={() => {
                            handlePage(TypeCount.INCR);
                        }}>
                            {MapIconKey[KEY_ICON.CHEVRONU]}
                        </div>
                        <div className={styles.chevronDown} onClick={() => {
                            handlePage(TypeCount.DECR);
                        }}>
                            {MapIconKey[KEY_ICON.CHEVROND]}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pagination;