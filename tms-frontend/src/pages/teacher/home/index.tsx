import { ROLE_USER } from '@/global/enum';
import ContainerPage from '@/layouts/containerPage/containerPage';
import React from 'react'

const Home = () => {
    return (
        <div>Home for teacher</div>
    )
}

export default Home;
Home.Layout = ContainerPage;
Home.Role = ROLE_USER.TC;