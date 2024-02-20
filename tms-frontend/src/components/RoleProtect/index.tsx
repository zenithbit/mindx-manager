import React from 'react';
import { Obj } from '@/global/interface';
import { ROLE_USER } from '@/global/enum';
import useGetCrrUser from '@/utils/hooks/getUser';
import Empty from '../Empty';

interface Props {
    children: React.ReactElement;
    roleProtect: ROLE_USER;
}
const RoleProtect = (props: Props) => {
    const crrRouteRole = ((props.children as Obj)?.type as Obj)?.Role;
    const crrUser = useGetCrrUser();
    if (crrUser && crrRouteRole !== props.roleProtect) {
        return <Empty />
    }
    return (
        props.children
    )
}

export default RoleProtect;