import React from 'react';
import { useCSVReader } from "react-papaparse";
import { Obj } from '@/global/interface';

interface Props {
    handleRowTitleColumn?: (data: string[]) => void;
}
const CSV = (props: Props) => {
    const { CSVReader } = useCSVReader();
    return (
        <CSVReader
            onUploadAccepted={(results: any) => {
                const data = results.data as string[][];
                props.handleRowTitleColumn?.(data[0]);
                const rowColumn = data[0];
                const mappingDatatoJson = [];

                for (let i = 1; i < data.length; i++) {
                    const objectRowData: Obj = {};
                    for (let j = 0; j < data[i].length; j++) {
                        objectRowData[rowColumn[j]] = data[i][j];
                    }
                    mappingDatatoJson.push(objectRowData);
                }
                console.log(mappingDatatoJson);
            }}
        >
            {({
                getRootProps,
            }: any) => (
                <>
                    <div>
                        <button type='button' {...getRootProps()}>
                            Browse file
                        </button>
                    </div>
                </>
            )}
        </CSVReader>
    )
}

export default CSV;