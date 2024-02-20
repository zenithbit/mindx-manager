import React from 'react';
import { CSVLink } from "react-csv";
import { Obj } from '@/global/interface';

interface Props {
    className?: string;
    data: Obj[] | any;
    fileName: string;
    label?: string;
    children?: React.ReactElement;
}
const ExportCSV = (props: Props) => {
    return (
        <CSVLink
            filename={`${props.fileName}`}
            data={props.data || []}
            className={`${props.className}`}
        >
            {props.children ? props.children : (props.label || 'Export to CSV')}
        </CSVLink>
    )
}

export default ExportCSV;