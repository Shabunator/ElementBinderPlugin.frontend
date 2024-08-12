import type { Dispatch, SetStateAction } from 'react';
import type { CreateProjectRequest } from '@entities/project';

import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Text, Button, TextInput, Modal } from '@gravity-ui/uikit';

import { createProject } from '@entities/project';

import styles from './CreateProject.module.css';

const validationSchema = object().shape({
    name: string()
        .required("Укажите название!"),
    description: string()
        .required("Укажите описание!"),
});

type CreateProjectProps = {
    isOpen: boolean;
    setIsOpen:  Dispatch<SetStateAction<boolean>>;
};

export const CreateProject = memo<CreateProjectProps>(({ isOpen, setIsOpen }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateProjectRequest>({
        resolver: yupResolver(validationSchema),
    });
    const navigate = useNavigate();

    const handleCloseModal = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    const onFinish = async (values: CreateProjectRequest) => {
        createProject({ ...values }).then(res => {
            if (res.code === 'refreshTokenError') {
                navigate('/login');
                return;
            }

            setIsOpen(false);
        })
    };

    return (
        <Modal
            open={isOpen}
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
                >
                    Создать
                </Button>
            </form>
        </Modal>
    );
});
