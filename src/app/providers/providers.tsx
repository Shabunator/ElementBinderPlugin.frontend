import {FC, ReactElement } from 'react';
import { ThemeProvider } from '@gravity-ui/uikit';
import { Provider as StoreProvider } from 'jotai';

interface IProviders {
    readonly children: ReactElement
}

export const Providers: FC<IProviders> = ({ children }) => {
    return (
        <StoreProvider>
            <ThemeProvider theme="light">
                {children}
            </ThemeProvider>
        </StoreProvider>
    );
}
