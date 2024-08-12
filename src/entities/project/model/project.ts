import type { CreateProjectRequest } from '../api/project';

import { requestCreateProject, requestGetAllProjects } from '../api/project';

export const createProject = (value: CreateProjectRequest) => {
    return requestCreateProject(value);
}

export const getAllProjects = () => {
    return requestGetAllProjects();
}
