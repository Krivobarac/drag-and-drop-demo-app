import { autobind } from "../_decorators/autobind.js";
import { ProjectState } from "../_states/project-state.js";
import { ComponentBase } from "../_types/classes/component-base.js";
import { ProjectStatus } from "../_types/enums/project-status.js";
import { Droppable } from "../_types/interfaces/drag-n-drop.js";
import { Project } from "../_types/interfaces/project.js";
import { SingleProject } from "./single-project.js";

export class ProjectList extends ComponentBase<HTMLDivElement, HTMLElement> implements Droppable {
    assignedProjects: Project[] = [];

    constructor(private type: ProjectStatus) {
        super('project-list', 'app', false, `${type}-projects`);

        this.configure();
        this.renderContent();
    }

    @autobind
    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer?.types.find(type => type === 'projectid')) {
            event.preventDefault();
            (this.element.querySelector('ul') as HTMLUListElement).classList.add('droppable');
        }
    }

    @autobind
    dropHandler(event: DragEvent) {
        const data = event.dataTransfer?.getData('projectid');
        if (data) 
            ProjectState.getInstance().changeProjectStatusById(data, this.type === ProjectStatus.FINISHED ? ProjectStatus.FINISHED : ProjectStatus.ACTIVE);
    }

    @autobind
    dragLeaveHandler(event: DragEvent) {
        if (event.pageX !== 0 || event.pageY !== 0)
            return;

        (this.element.querySelector('ul') as HTMLUListElement).classList.remove('droppable'); 
    }

    protected configure() {
        ProjectState.getInstance().addListeners((projects: Project[]) => {
            this.assignedProjects = projects.filter(proj => proj.status === this.type);
            this.renderProjects();
        })

        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('drop', this.dropHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
    }

    protected renderContent() {
        this.element.querySelector('ul')!.id = `${this.type}-projects-list`;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    protected renderProjects() {
        (document.getElementById(`${this.type}-projects-list`) as HTMLUListElement).innerHTML = '';
        this.assignedProjects.forEach(project => {
            new SingleProject(project, this.type + '-projects-list')
        })
    }
}