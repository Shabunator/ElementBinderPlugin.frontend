import { FC, ReactElement } from 'react';
import { ThemeProvider, ToasterProvider, ToasterComponent } from '@gravity-ui/uikit';
import { Provider as StoreProvider } from 'jotai';

interface IProviders {
    readonly children: ReactElement
}

export const Providers: FC<IProviders> = ({ children }) => {
    return (
        <StoreProvider>
            <ThemeProvider theme="light">
                <ToasterProvider>
                    {children}
                    <ToasterComponent />
                </ToasterProvider>
            </ThemeProvider>
        </StoreProvider>
    );
}
