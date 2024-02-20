import React, { useState, useMemo } from 'react';
import { Button, Input } from 'antd';
import JoditEditor, { IJoditEditorProps } from 'jodit-react';

interface Props extends IJoditEditorProps {
    placeholder?: string;
    title?: string;
    setTitle?: (newTitle: string) => void;
    handleSubmit?: () => void;
    hasTitle?: boolean;
    loadingButton?: boolean;
    textButton?: string;
}
const TextEditor = (props: Props) => {

    const [title, setTitle] = useState(props.title || '');
    const config: typeof props.config = useMemo(() => {
        return {
            readonly: false, // all options from https://xdsoft.net/jodit/docs/,
            placeholder: props.placeholder || 'Start typings...',
        }
    }, [props.placeholder]);

    return (
        <div className={'customize-text-editor'}>
            {props.hasTitle && <div className='title'>
                <Input placeholder="Tiêu đề" value={props.title || title} onChange={(e) => {
                    if (props.setTitle) {
                        props.setTitle?.(e.target.value);
                    } else {
                        setTitle(e.target.value);
                    }
                }} />
            </div>}
            <JoditEditor
                value={props.value}
                config={config}
                className={`${props.className}`}
                onBlur={props.onBlur} // preferred to use only this option to update the content for performance reasons
                onChange={props.onChange}
            />
            <Button
                loading={props.loadingButton}
                className={'btnStorage'}
                onClick={() => {
                    props.handleSubmit?.();
                }}>{props.textButton ? props.textButton : 'Lưu'}</Button>
        </div>
    );
}

export default TextEditor;