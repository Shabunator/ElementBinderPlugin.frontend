import type { FormEvent } from 'react';

import { useCallback} from 'react';
import { Button, TextInput } from "@gravity-ui/uikit";

import './loginPage.css';

export const LoginPage = () => {
    const handlerSubmit = useCallback((evt: FormEvent) => {
        evt.preventDefault();
    }, []);

    return(
        <form className="loginForm" action="/login" method="POST" onSubmit={handlerSubmit}>
            <TextInput size="l" type="email" placeholder="Email"/>
            <TextInput size="l" type="password" placeholder="Пароль"/>
            <Button view="action" type="submit" size="l">Сохранить</Button>
        </form>
    );
}
