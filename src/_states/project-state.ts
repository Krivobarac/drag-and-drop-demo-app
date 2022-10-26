import { StateBase } from "../_types/classes/state-base.js";
import { ProjectStatus } from "../_types/enums/project-status.js";
import { Project } from "../_types/interfaces/project.js";

export class ProjectState extends StateBase<Project> {
    private static instance: ProjectState;
    private projects: Project[] = [];

    private constructor() {
        super();
    }

    addProject(title: string, description: string, numOfPeople: number, status: ProjectStatus) {
        const newProject: Project = {
            id: Math.random().toString(),
            title,
            description,
            people: numOfPeople,
            status
        }

        this.projects.push(newProject);
        
        this.setListeners();
    }

    static getInstance(): ProjectState {
        if (!ProjectState.instance) {
            ProjectState.instance = new ProjectState();
        } 

        return ProjectState.instance;
    }

    changeProjectStatusById(projectId: string, projectStatus: ProjectStatus) {
        const project = this.projects.find(project => project.id === projectId);
        if (project && project.status !== projectStatus) {
            project.status = projectStatus;
            this.setListeners();
        }
    }

    private setListeners() {
        this.listeners.forEach(listenerFn => {
            listenerFn(this.projects.slice());
        });
    }
}