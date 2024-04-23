import { FC, ReactElement } from 'react';
import { ThemeProvider } from '@gravity-ui/uikit';

interface IProviders {
    readonly children: ReactElement
}

export const Providers: FC<IProviders> = ({ children }) => {
    return (
        <ThemeProvider theme="light">
            {children}
        </ThemeProvider>
    );
}
