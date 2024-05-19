import type { FC } from "react";

import { useState, useCallback } from "react";
import { TextInput, Button, Icon } from '@gravity-ui/uikit';
import { TrashBin } from '@gravity-ui/icons';

import { usePostMessage } from '@shared/hooks';

import './homePage.css';

const Image: FC<{ srcUrl: string, deleteHandler: (srcUrl: string) => void }> = ({ srcUrl, deleteHandler }) => {
    return (
        <div className="homePage__imageWrapper">
            <Button
                view="outlined-danger"
                size="l"
                className="homePage__deleteBtn"
                onClick={() => deleteHandler(srcUrl)}
            >
                <Icon data={TrashBin} size={18} />
            </Button>
            <img
                src={srcUrl}
                className="homePage__image"
                alt=""
            />
        </div>
    );
}

export const HomePage: FC = () => {
    const [images, setImages] = useState<{ srcUrl: string }[]>([]);
    const deleteHandler = useCallback((srcUrl: string) => {
        setImages(images.filter(img => img.srcUrl !== srcUrl));
    }, [images]);

    usePostMessage<{ srcUrl: string }>('click-context-menu', (data) => {
        if (images.some(i => i.srcUrl === data.srcUrl)) {
            return;
        }

        setImages(oldArray => [...oldArray, data]);
    });

    return (
        <div className="homePage">
            {images.length > 0 &&
                <div className="homePage__imagesRow">
                    <Image srcUrl={images[0].srcUrl} deleteHandler={deleteHandler} />
                    <div className="homePage__miniImagesRow">
                        {images.map((image, i) => {
                            if (i === 0) {
                                return null;
                            }

                            return (
                                <Image
                                    key={i}
                                    srcUrl={image.srcUrl}
                                    deleteHandler={deleteHandler}
                                />)
                        })}
                    </div>
                </div>
            }
            <TextInput size="l" placeholder="Наименование"/>
            <TextInput size="l" placeholder="Артикул"/>
            <TextInput size="l" placeholder="Размер" />
            <TextInput size="l" placeholder="Название материала" />
            <div className="homePage__priceBlock">
                <TextInput size="l" placeholder="Цена" />
                <TextInput size="l" placeholder="Единицы измерения" />
            </div>
            <Button view="action" size="l">Сохранить</Button>
        </div>
    );
};
