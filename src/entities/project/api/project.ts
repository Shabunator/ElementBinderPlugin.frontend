import { request } from "@shared/utils/request";
import { PROJECT } from '@shared/utils/url';

export type CreateProjectRequest = {
    name: string;
    description: string;
};

export type CreateProjectResponse = {
    id: string;
    name: string;
    description: string;
};

export const requestCreateProject = (createProjectRequest: CreateProjectRequest) => {
    return request<CreateProjectResponse>(PROJECT, {
        method: 'POST',
        body: JSON.stringify(createProjectRequest),
    })
        .then()
        .catch();
}

export const requestGetAllProjects = () => {
    return request<CreateProjectResponse>(PROJECT)
        .then()
        .catch();
}
