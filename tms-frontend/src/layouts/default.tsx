import React from 'react';
import Head from 'next/head';

interface Props {
    children: React.ReactElement;
}
function DefaultLayout(props: Props) {
    return (
        <div className={"container_default"}>
            <Head>
                <title>MindX</title>
                <link rel="icon" type="image/x-icon" href="/static/logo.png" />
                <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            </Head>
            {props.children}
        </div>
    )
}

export default DefaultLayout;