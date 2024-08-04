import { FC, ReactElement } from 'react';
import { ThemeProvider } from '@gravity-ui/uikit';
import { Provider as StoreProvider } from 'jotai';

import { ChromeProvider } from '@shared/context/chrome';

interface IProviders {
    readonly children: ReactElement
}

export const Providers: FC<IProviders> = ({ children }) => {
    return (
        <StoreProvider>
            <ChromeProvider>
                <ThemeProvider theme="light">
                    {children}
                </ThemeProvider>
            </ChromeProvider>
        </StoreProvider>
    );
}
