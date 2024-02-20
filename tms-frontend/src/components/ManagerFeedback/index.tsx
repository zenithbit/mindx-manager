import React, { useState } from 'react';
import { TabsProps } from 'antd';
import Tabs from '../Tabs';
import styles from '@/styles/feedback/Feedback.module.scss';
import ListClass from './ListClass';
import Question from './Question';
import CollectionAnswer from './CollectionAnswer';

export enum ListTabFeedBack {
    QUESTION = 'QUESTION',
    COLLECTION_ANSWER = 'COLLECTION_ANSWER',
    STATUS_CLASS_ENABLED = 'STATUS_CLASS_ENABLED'
}
export const getLabelListTabFeedBack: Record<ListTabFeedBack, string> = {
    COLLECTION_ANSWER: 'Câu trả lời',
    QUESTION: ' Câu hỏi',
    STATUS_CLASS_ENABLED: 'Tổng hợp lớp'
}
const FormFeedback = () => {
    const listItemTab: TabsProps['items'] = [
        {
            key: ListTabFeedBack.QUESTION,
            label: getLabelListTabFeedBack[ListTabFeedBack.QUESTION]
        },
        {
            key: ListTabFeedBack.COLLECTION_ANSWER,
            label: getLabelListTabFeedBack[ListTabFeedBack.COLLECTION_ANSWER]
        },
        {
            key: ListTabFeedBack.STATUS_CLASS_ENABLED,
            label: getLabelListTabFeedBack[ListTabFeedBack.STATUS_CLASS_ENABLED]
        }
    ];
    const getComponentTab: Record<ListTabFeedBack, React.ReactElement> = {
        STATUS_CLASS_ENABLED: <ListClass />,
        QUESTION: <Question />,
        COLLECTION_ANSWER: <CollectionAnswer />
    }
    const [currentTab, setCurrentTab] = useState<ListTabFeedBack>(ListTabFeedBack.QUESTION);
    return (
        <div className={styles.containerFormfeedback}>
            <Tabs
                notAllowContent
                listItemTab={listItemTab}
                activeKey={currentTab}
                onClickTab={(key) => {
                    setCurrentTab(key as ListTabFeedBack)
                }}
            />
            {getComponentTab[currentTab]}
        </div>
    )
}

export default FormFeedback;