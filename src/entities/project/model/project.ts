import type { CreateProjectRequest } from '../api/project';

import { requestCreateProject } from '../api/project';

export const createProject = (value: CreateProjectRequest) => {
    return requestCreateProject(value);
}
