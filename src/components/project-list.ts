import { ProjectState } from "../_states/project-state.js";
import { ComponentBase } from "../_types/classes/component-base.js";
import { ProjectStatus } from "../_types/enums/project-status.js";
import { Project } from "../_types/interfaces/project.js";
import { SingleProject } from "./single-project.js";

export class ProjectList extends ComponentBase<HTMLDivElement, HTMLElement> {
    assignedProjects: Project[] = [];

    constructor(private type: ProjectStatus) {
        super('project-list', 'app', false, `${type}-projects`);

        ProjectState.getInstance().addListeners((projects: Project[]) => {
            this.assignedProjects = projects.filter(proj => proj.status === this.type);
            this.renderProjects();
        })

        this.renderContent();
    }

    protected renderContent() {
        this.element.querySelector('ul')!.id = `${this.type}-projects-list`;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    protected renderProjects() {
        (document.getElementById(`${this.type}-projects-list`) as HTMLUListElement).innerHTML = '';
        this.assignedProjects.forEach(project => {
            new SingleProject(project)
        })
    }
}