import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Button, TextInput, Icon } from '@gravity-ui/uikit';
import { Magnifier } from '@gravity-ui/icons';

import { MainLayout } from '@shared/ui/layoutMain';
import { getAllProjects } from '@entities/project';
import { CreateProject } from '@features/createProject';

import styles from './projects.module.css';

export const Projects = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = useCallback(() => {
        setIsOpen(true);
    }, [setIsOpen]);

    useEffect(() => {
        getAllProjects()
            .then((projects) => {
                if (res.code === 'refreshTokenError') {
                    navigate('/login');
                    return;
                }

                console.log('@getAllProject', projects);
            });
    }, []);

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

            <CreateProject
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </MainLayout>
    );
};
