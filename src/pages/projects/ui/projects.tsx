import type { CreateProjectRequest } from '@entities/project';

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Text, Button, TextInput, Icon, Modal } from '@gravity-ui/uikit';
import { Magnifier } from '@gravity-ui/icons';

import { MainLayout } from '@shared/ui/layoutMain';
import { createProject } from '@entities/project';

import styles from './projects.module.css';

const validationSchema = object().shape({
    name: string()
        .required("Укажите название!"),
    description: string()
        .required("Укажите описание!"),
})

export const Projects = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateProjectRequest>({
        resolver: yupResolver(validationSchema),
    });
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleOpenModal = useCallback(() => {
        setOpen(true);
    }, []);
    const handleCloseModal = useCallback(() => {
        setOpen(false);
    }, []);

    const onFinish = async (values: CreateProjectRequest) => {
        createProject({ ...values }).then(res => {
            if (res.code === 'refreshTokenError') {
                navigate('/login');
                return;
            }

            console.log('@onFinish', res);
        })
    };

    return (
        <MainLayout>
            <Text
                variant="display-1"
                className={styles.title}
            >
                Ваши проекты
            </Text>
            <header className={styles.header}>
                <TextInput
                    size="l"
                    placeholder="Поиск"
                    className={styles.search}
                    startContent={
                        <Icon
                            data={Magnifier}
                            size={18}
                            className={styles.searchIcon}
                        />
                    }
                />
                <Button
                    view="action"
                    size="l"
                    onClick={handleOpenModal}
                >
                    Создать
                </Button>
            </header>

            <Modal
                open={open}
                onClose={handleCloseModal}
            >
                <form
                    className={styles.modalContainer}
                    onSubmit={handleSubmit(onFinish)}
                >
                    <label className={styles.label}>
                        <Text variant="subheader-3">
                            Название
                        </Text>
                        <TextInput
                            size="xl"
                            placeholder="Например адрес"
                            validationState={errors.name ? 'invalid' : undefined}
                            errorMessage={errors.name ? errors.name.message : ''}
                            {...register('name')}
                        />
                    </label>
                    <label className={styles.label}>
                        <Text variant="subheader-3">
                            Описание
                        </Text>
                        <TextInput
                            size="xl"
                            validationState={errors.description ? 'invalid' : undefined}
                            errorMessage={errors.description ? errors.description.message : ''}
                            {...register('description')}
                        />
                    </label>
                    <Button
                        view="action"
                        size="xl"
                        type="submit"
                        onClick={handleOpenModal}
                    >
                        Создать
                    </Button>
                </form>
            </Modal>
        </MainLayout>
    );
};
