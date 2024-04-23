import { TextInput } from '@gravity-ui/uikit';

import './homePage.css';

export const HomePage = () => {
    return (
        <div className="homePage">
            <TextInput size="l" placeholder="Наименование" />
            <TextInput size="l" placeholder="Артикул" />
            <TextInput size="l" placeholder="Размер" />
            <TextInput size="l" placeholder="Название материала" />
            <div className="homePage__priceBlock">
                <TextInput size="l" placeholder="Цена" />
                <TextInput size="l" placeholder="Единицы измерения" />
            </div>
        </div>
    );
};
