import React from 'react';
import { StepProps, Steps } from 'antd';
import styles from '@/styles/Step.module.scss';

interface Props {
    currentStep: number;
    items: StepProps[];
    className?: string;
    labelPlacement?: "vertical" | "horizontal"
}
const Step = (props: Props) => {
    return (
        <Steps
            labelPlacement={props.labelPlacement}
            size="small"
            className={`${styles.stepComponent} ${props.className} stepComponent`}
            current={props.currentStep}
            items={props.items}
        />
    )
}

export default Step;