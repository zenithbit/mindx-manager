import React from 'react';
import dynamic from 'next/dynamic';
import { ROLE_USER } from '@/global/enum';
import Loading from '@/components/loading';

const CreatePage = (componentDirectString: string, role: ROLE_USER, layout: (props: any) => JSX.Element) => {
    const DynamicComponent = dynamic(() => import(`@/components/${componentDirectString}`), {
        ssr: false,
        loading: () => <Loading isCenterScreen/>
    })
    const Page = () => {
        return (
            <DynamicComponent />
        )
    }
    Page.Layout = layout;
    Page.Role = role;
    return Page;
};
export default CreatePage;
