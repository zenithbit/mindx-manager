import React, { useEffect } from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { Obj } from '@/global/interface';
import { useHandleDrawer, useListCollectionQuiz } from '@/utils/hooks';
import CollectionTest from './CollectionTest';
import Loading from '../loading';
import Empty from '../Empty';
import styles from '@/styles/Test.module.scss';

const Synthetic = () => {
    const drawer = useHandleDrawer();
    const router = useRouter();
    const listCollectionQuiz = useListCollectionQuiz();
    const getListCollectionQuiz = listCollectionQuiz.data.response?.data as Obj[] || [];
    const courseId = router.query.courseId as string;
    const courseLevelId = router.query.courseLevelId as string;
    const getPayload = listCollectionQuiz.data.payload?.query?.query as Obj;
    const compareData = getPayload?.courseLevelId !== courseLevelId;

    const handleOpenForm = () => {
        drawer.open({
            open: true,
            componentDirection: 'Test/FormCollectionTest',
            props: {
                courseLevelId,
                courseId
            },
            title: 'Tạo tập kiểm tra'
        });
    }
    useEffect(() => {
        if (!getListCollectionQuiz || compareData)
            listCollectionQuiz.query({
                query: {
                    courseLevelId,
                    courseId
                }
            });
    }, []);
    return (
        <div className={styles.containerSynthetic}>
            <div className={styles.tool}>
                <Button size="small" onClick={() => {
                    handleOpenForm();
                }}>Thêm bộ câu hỏi</Button>
            </div>
            <div className={styles.content}>

                {compareData ? <Loading isCenterScreen /> :
                    (getListCollectionQuiz.length === 0 ? < Empty /> : getListCollectionQuiz.map(item => {
                        return <CollectionTest data={item} key={item._id} />
                    }))
                }

            </div>
        </div>
    )
}

export default Synthetic;