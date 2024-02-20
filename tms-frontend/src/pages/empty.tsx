import React from 'react';
import Empty from '@/components/Empty';
import ContainerPage from '@/layouts/containerPage/containerPage';

const EmptyPage = () => {
    return (
        <Empty />
    )
}

export default EmptyPage;
EmptyPage.Layout = ContainerPage;