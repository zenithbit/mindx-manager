import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Obj } from '@/global/interface';
import { Button, Input } from 'antd';
import { useGetTeacherDetail, useUpdateDetailTeacher } from '@/utils/hooks';
import styles from '@/styles/teacher/DetailTeacher.module.scss';
import { useRouter } from 'next/router';
import { useHookMessage } from '@/utils/hooks/message';

interface Props {
    currentSalary?: number;
    listSalary?: Obj[];
    idSalary?: string;
    type: 'UPDATE' | 'ADD';
}
const PopupSalary = (props: Props) => {
    const router = useRouter();
    const message = useHookMessage();
    const detailTeacher = useGetTeacherDetail();
    const updateDetailTeacher = useUpdateDetailTeacher();
    const [salary, setSalary] = useState<{
        format: string,
        value: number
    }>({
        format: props.currentSalary?.toLocaleString() as string || '',
        value: props.currentSalary as number || 0
    });
    const handleChange = (value: string) => {
        const newValue = value.replaceAll(',', '');
        if ((Number(newValue) || (Number(newValue) === 0)) && typeof Number(newValue) === 'number') {
            setSalary({
                format: Number(newValue).toLocaleString(),
                value: Number(newValue)
            })
        }
    }
    const handleUpdateSalary = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const getCurrentListSalary = props.listSalary!.map((item) => {
            return {
                ...item
            }
        });
        if (props.type === 'UPDATE') {
            const findCurrentSalary = getCurrentListSalary.find((item) => {
                return item._id === props.idSalary;
            }) as Obj;
            if (findCurrentSalary) {
                findCurrentSalary.rank = salary.value
            };
        } else {
            const newSalary = {
                rank: salary.value
            };
            getCurrentListSalary.push(newSalary);
        }
        updateDetailTeacher.query({
            body: {
                salaryPH: getCurrentListSalary
            },
            params: [router.query.teacherId as string]
        });
    }
    useEffect(() => {
        if (updateDetailTeacher.data.response) {
            if (updateDetailTeacher.data.success) {
                detailTeacher.query(router.query.teacherId as string, []);
            }
            message.open({
                content: updateDetailTeacher.data.response.message as string,
                type: updateDetailTeacher.data.success ? 'success' : 'error'
            });
            updateDetailTeacher.clear?.();
            message.close();
        }
    }, [updateDetailTeacher.data]);
    return (
        <div className={styles.popupSalary}>
            <Form className={styles.formSalary} onSubmit={handleUpdateSalary}>
                <Form.Group>
                    <Input value={salary.format} onChange={(e) => {
                        handleChange(e.target.value);
                    }} />
                </Form.Group>
                <div className={styles.btnAction}>
                    <Button size="small" htmlType="submit">{props.type === 'UPDATE' ? 'Cập nhật' : 'Thêm'}</Button>
                    {props.type === 'UPDATE' && <Button size="small">Reset</Button>}
                </div>
            </Form>
        </div>
    )
}

export default PopupSalary;