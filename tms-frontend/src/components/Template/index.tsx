import React, { useEffect, useState } from 'react';
import Tabs from '../Tabs';
import { TemplateMail } from '@/global/enum';
import { getLabelMailTemplate } from '@/global/init';
import { Obj } from '@/global/interface';
import { useCreateMailTemplate, useGetMailTemplate, useUpdateMailTemplate } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import Loading from '../loading';
import TextEditor from '../TextEditor';
import styles from '@/styles/MailTemplate.module.scss';

const listTemplateString = Object.values(TemplateMail);

const Template = () => {
    const [currentTemplate, setCurrentTemplate] = useState<TemplateMail>(TemplateMail.FAILCV);

    const mailTemplate = useGetMailTemplate();
    const dataMailtemplate = mailTemplate.data.response?.data as Obj;

    const createMailTemplate = useCreateMailTemplate();
    const updateMailTemplate = useUpdateMailTemplate();

    const message = useHookMessage();
    const [title, setTitle] = useState(dataMailtemplate?.title || '');
    const [value, setValue] = useState(dataMailtemplate?.html || '');


    const handleBlur = (newValue: string) => {
        setValue(newValue);
    }
    const handleChange = (newValue: string) => {
        // console.log(newValue);
    }
    const handleSave = () => {
        if (dataMailtemplate) {
            if (title && value && Object.keys(dataMailtemplate).length) {
                updateMailTemplate.query({
                    params: [dataMailtemplate._id],
                    body: {
                        title,
                        html: value
                    }
                });
            } else {
                createMailTemplate.query({
                    body: {
                        template: currentTemplate,
                        html: value,
                        title: title
                    }
                });
            }
        }
    }

    const listTab = listTemplateString.map((item) => {
        return {
            key: item,
            label: getLabelMailTemplate[item]
        }
    });

    useEffect(() => {
        mailTemplate.query({
            query: {
                template: currentTemplate
            }
        });
    }, [currentTemplate]);
    useEffect(() => {
        if (dataMailtemplate && Object.keys(dataMailtemplate).length) {
            setTitle(dataMailtemplate.title);
            const exmple = dataMailtemplate.html ? String(dataMailtemplate.html).replace('NAME', 'Nguyễn Văn A').replace('POSITION', 'Giáo viên/Trợ giảng Khối ...') : '';
            setValue(exmple);
        } else {
            setTitle('');
            setValue('');
        }
    }, [dataMailtemplate]);
    useEffect(() => {
        if (createMailTemplate.data.response) {
            message.open({
                type: createMailTemplate.data.success ? 'success' : 'error',
                content: createMailTemplate.data.response.message as string
            });
            createMailTemplate.clear?.();
            message.close()
        }
        if (updateMailTemplate.data.response) {
            message.open({
                type: updateMailTemplate.data.success ? 'success' : 'error',
                content: updateMailTemplate.data.response.message as string
            });
            updateMailTemplate.clear?.();
            message.close();
        }
    }, [createMailTemplate, updateMailTemplate]);
    return (
        <div className={styles.containerMailTemplate}>
            <Tabs
                className={styles.tabTemplate}
                onClickTab={(key) => {
                    setCurrentTemplate(key as TemplateMail);
                }}
                notAllowContent
                listItemTab={listTab}
            />
            <TextEditor
                title={title}
                setTitle={setTitle}
                hasTitle
                value={value}
                onBlur={handleBlur}
                onChange={handleChange}
                handleSubmit={handleSave}
                loadingButton={createMailTemplate.data.isLoading || updateMailTemplate.data.isLoading}
            />
            {
                (!mailTemplate.data.response || mailTemplate.data.isLoading) &&
                <div className={styles.loadingOverlay}>
                    <Loading />
                </div>
            }
        </div >
    )
}

export default Template;