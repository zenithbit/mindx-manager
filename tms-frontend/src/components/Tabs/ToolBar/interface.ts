export interface FieldFilter {
    key: string;
    value: any;
    title: string;
}

export interface ContextInterface {
    crrKeyTab: string;
    listFieldFilter: Array<FieldFilter>;
    setContext: (data: {
        crrKeyTab: string;
        listFieldFilter: Array<{
            key: string;
            value: any;
        }>;
    }) => void;
}