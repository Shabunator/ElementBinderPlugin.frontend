import type { FC, PropsWithChildren } from 'react';

import styles from './main.module.css';

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
}
