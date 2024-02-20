import React from 'react';
import { ROLE_TEACHER } from '@/global/enum';
import Dropdown from '../Dropdown';
import { mapRoleToString } from '@/global/init';

interface Props {
    size?: 'small' | 'large' | 'middle';
    title?: string;
    onClickItem?: (role: ROLE_TEACHER) => void;
}
const SelectRole = (props: Props) => {
    const role: Array<ROLE_TEACHER> = [ROLE_TEACHER.ST, ROLE_TEACHER.MT, ROLE_TEACHER.SP];
    return (
        <Dropdown
            title={props.title || 'Chọn role'}
            listSelect={role.map((item) => {
                return {
                    key: item,
                    label: mapRoleToString[item],
                    onClick() {
                        props.onClickItem?.(item);
                    }
                }
            })}
            sizeButton={props.size}
            trigger={'click'}
        />
    )
}

export default SelectRole;