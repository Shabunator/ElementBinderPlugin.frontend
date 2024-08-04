import { request } from "@shared/utils/request";

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
    return request<CreateProjectResponse>('http://localhost:8082/api/v1/project', {
        method: 'POST',
        body: JSON.stringify(createProjectRequest),
    })
        .then()
        .catch();
}
