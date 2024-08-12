import type { FC } from 'react';
import type { LoginRequest } from '@entities/user';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextInput, useToaster } from "@gravity-ui/uikit";

import { login } from '@entities/user';

import styles from './loginForm.module.css';
 
const validationSchema = object().shape({
    email: string().email()
        .required("Укажите email!"),
    password: string()
        .required("Укажите пароль!"),
})

export const LoginForm: FC = () => {
    const { add } = useToaster();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>({
        resolver: yupResolver(validationSchema),
    })

    const onFinish = async (values: LoginRequest) => {
        login({ ...values }).then(res => {
            if (res.state === 'hasData') {
                add({
                    name: 'signup',
                    title: 'Вы вошли',
                    theme: 'success',
                    isClosable: true
                });
                navigate('/');
                return;
            }

            add({
                name: 'login',
                title: 'Ошибка',
                content: 'Неверный email или пароль',
                theme: 'danger',
                isClosable: true
            });
        })
    };

    return(
        <form
            className={styles.container}
            onSubmit={handleSubmit(onFinish)}
        >
            <div>
                <TextInput
                    size="l"
                    id="email"
                    type="email"
                    placeholder="Email"
                    validationState={errors.email ? 'invalid' : undefined}
                    errorMessage={errors.email ? errors.email.message : ''}
                    {...register('email')}
                />
            </div>

            <div>
                <TextInput
                    size="l"
                    id="password"
                    type="password"
                    placeholder="Пароль"
                    validationState={errors.password ? 'invalid' : undefined}
                    errorMessage={errors.password ? errors.password.message : ''}
                    {...register('password')}
                />
            </div>

            <Button view="action" type="submit" size="l">Войти</Button>
        </form>
    );
}
