import type { FC } from 'react';
import { SignupRequest } from '@entities/user';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextInput, useToaster } from "@gravity-ui/uikit";

import { signup } from '@entities/user';

import styles from './signUpForm.module.css';

const validationSchema = object().shape({
    name: string()
        .required("Укажите имя организации!"),
    email: string().email()
        .required("Укажите email!"),
    password: string()
        .required("Укажите пароль!"),
})

export const SignUpForm: FC = () => {
    const { add } = useToaster();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupRequest>({
        resolver: yupResolver(validationSchema),
    })

    const onFinish = async (values: SignupRequest) => {
        signup({ ...values }).then(res => {
            if (res.state === 'hasData') {
                add({
                    name: 'signup',
                    title: 'Вы зарегистрированы',
                    theme: 'success',
                    isClosable: true
                });
                navigate('/login');
                return;
            }

            if (res.error?.message) {
                add({
                    name: 'signup',
                    title: 'Ошибка',
                    content: res.error.message,
                    theme: 'danger',
                    isClosable: true
                });
            }
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
                    id="name"
                    type="text"
                    placeholder="Имя"
                    validationState={errors.name ? 'invalid' : undefined}
                    errorMessage={errors.name ? errors.name.message : ''}
                    {...register('name')}
                />
            </div>
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

            <Button view="action" type="submit" size="l">Зарегистрироваться</Button>
        </form>
    );
}
