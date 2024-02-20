import React from 'react';
import dynamic from 'next/dynamic';
import { Drawer } from 'antd';
import { useHandleDrawer } from '@/utils/hooks';
import Loading from '../loading';
import { OpenDrawer } from '@/store/reducers/global-reducer/drawer';

const DrawerComponent = () => {
    const drawer = useHandleDrawer();
    const getDataDrawer = drawer.data.response as unknown as OpenDrawer;
    const DynamicComponent = dynamic(() => import(`@/components/${getDataDrawer.componentDirection}`), {
        ssr: false,
        loading: () => <Loading isCenterScreen />
    })
    return (
        <div>
            {getDataDrawer?.open && <Drawer {...getDataDrawer} maskClosable={false} onClose={() => {
                drawer.close()
            }}>
                <DynamicComponent {...getDataDrawer.props} />
            </Drawer>}
        </div>
    )
}

export default DrawerComponent;