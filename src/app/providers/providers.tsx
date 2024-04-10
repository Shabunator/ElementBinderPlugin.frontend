import { FC } from 'react';
import { ThemeProvider } from '@gravity-ui/uikit';

interface IProviders {
    /** Content that will be wrapped by providers. */
    readonly children: JSX.Element
}

export const Providers: FC<IProviders> = ({ children }) => {
    return (
        <ThemeProvider theme="light">
            {children}
        </ThemeProvider>
    );
}
