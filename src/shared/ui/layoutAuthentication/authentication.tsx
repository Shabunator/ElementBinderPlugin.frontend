import type { FC, PropsWithChildren } from 'react';

import { useCallback } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';
import { Text, Button } from '@gravity-ui/uikit';

import Google from '@shared/assets/google.svg?react';
import Apple from '@shared/assets/apple.svg?react';
import Yandex from '@shared/assets/yandex.svg?react';

import styles from './authentication.module.css';

export const AuthenticationLayout: FC<PropsWithChildren> = ({ children }) => {
    const isLogin = !!useMatch('/login');
    const navigate = useNavigate();
    const handleSignup = useCallback(() => {
        navigate(isLogin ? '/signup' : '/login');
    }, [isLogin, navigate])

    return (
        <div className={styles.container}>
            <Text
                variant="display-1"
                className={styles.title}
            >
                {isLogin ? 'Вход' : 'Регистрация'}
            </Text>
            <div className={styles.methods}>
                <div className={styles.form}>
                    {children}
                    <Button
                        view="outlined"
                        size="l"
                        onClick={handleSignup}
                    >
                        {isLogin ? 'Регистрация' : 'Вход'}
                    </Button>
                </div>
                <div className={styles.verticalLine} />
                <div className={styles.socialNetworkContainer}>
                    <Text variant="subheader-2">
                        Или используй соц. сети
                    </Text>
                    <div className={styles.socialNetwork}>
                        <Google className={styles.icon} />
                        <Apple className={styles.icon} />
                        <Yandex className={styles.icon} />
                    </div>
                </div>
            </div>
        </div>
    );
}
