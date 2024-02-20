import React, { useRef, useState, HTMLAttributes } from 'react';
import { Button, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Cropper, { ReactCropperElement } from "react-cropper";
import styles from '@/styles/CropImage.module.scss';

interface Props extends HTMLAttributes<HTMLElement | any> {
    src: string;
    onCropped?: (file: Blob) => void;
    width?: number;
    height?: number;
    className?: string;
    classNameImgPreview?: string;
    disabledFixResize?: boolean;
    disabledCircleImage?: boolean;
};
const CropImage = (props: Props) => {
    const [image, setImage] = useState(props.src ?? "");
    const cropperRef = useRef<ReactCropperElement>();
    const [imagePreview, setImagePreview] = useState<string>(props.src ?? "");
    const [acceptImage, setAcceptImage] = useState(!!props.src);
    const inputRef = useRef<HTMLInputElement>(null);

    const onChange = (e: any) => {
        e.preventDefault();

        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const maxSizeInBytes = 5 * 1024 * 1024;
        if (files[0]?.size > maxSizeInBytes) {
            alert('Kích thước file không được quá 5MB');
            return;
        }
        else if (!String(files[0]?.type).includes("image")) {
            alert('Chỉ chấp nhận các định dạng hình ảnh');
            return;
        } else {
            if (files[0]) {
                const reader = new FileReader();
                reader.onload = () => {
                    setImage(reader.result as any);
                };
                (reader as any).readAsDataURL(files[0]);
            }
        }
    };
    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            const getCanvas = cropperRef.current?.cropper.getCroppedCanvas();
            if (getCanvas) {
                setImagePreview(getCanvas?.toDataURL("image/webp"));
                (getCanvas.toBlob((blob) => {
                    if (blob) {
                        props.onCropped?.(blob);
                    }
                }, "image/webp", 0.95));
            }
        }
    };
    return (
        <div className={`${styles.cropImage} ${props.className ?? ''}`}>
            {(acceptImage) ?
                <Image alt='' className={`${styles.image} ${props.classNameImgPreview}`} src={imagePreview} width={!props.disabledFixResize ? (props.width ?? 200) : '100%'} height={!props.disabledFixResize ? (props.height ?? 200) : ''} style={{ borderRadius: props.disabledCircleImage ? '0' : "50%", ...props.style }} /> :
                (<div className={styles.cropping}>
                    <input style={{ display: "none" }} ref={inputRef} type="file" onChange={onChange} />
                    <Button icon={<UploadOutlined />} size="small" onClick={() => {
                        inputRef.current?.click();
                    }}>Chọn ảnh</Button>
                    <Cropper
                        width={props.width ?? 200}
                        size={100}
                        ref={cropperRef as any}
                        style={{ height: 200 }}
                        zoomTo={0}
                        aspectRatio={props.disabledFixResize ? 0 : 1}
                        src={image}
                        viewMode={2}
                        minCropBoxHeight={5}
                        minCropBoxWidth={5}
                        cropBoxResizable={true}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false}
                        guides={true}
                    />
                </div>)
            }
            {/* {(!acceptImage) && 
            } */}
            <Button className={styles.btnHandle} onClick={() => {
                if (!acceptImage) {
                    getCropData();
                }
                setAcceptImage(!acceptImage);
            }}>{!acceptImage ? "Duyệt" : "Đổi"}</Button>
            <Button onClick={() => {
                setImagePreview(props.src as string);
                setAcceptImage(true);
            }}>Reset</Button>
        </div>
    )
}

export default CropImage;