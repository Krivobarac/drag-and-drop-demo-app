import { ProjectStatus } from "../enums/project-status.js";

export interface Project {
    id: string,
    title: string;
    description: string;
    people: number;
    status: ProjectStatus
}