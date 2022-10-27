import { autobind } from "../_decorators/autobind.js";
import { ComponentBase } from "../_types/classes/component-base.js";
import { Draggable } from "../_types/interfaces/drag-n-drop.js";
import { Project } from "../_types/interfaces/project.js";

export class SingleProject extends ComponentBase<HTMLUListElement, HTMLLIElement> implements Draggable {
    constructor(private project: Project, hostId: string) {
        super('single-project', hostId, false);

        this.renderContent();
        this.configure();
    }

    @autobind
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('projectid', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    @autobind
    dragEndHandler(_event: DragEvent): void {
        this.hostElement.classList.remove('droppable'); 
    }

    get persons(): string {
        const personsText = this.project.people + ' person';
        return this.project.people === 1 ? personsText : personsText + 's';
    }

    protected configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    protected renderContent(): void {
        (this.element.querySelector('h2') as HTMLHeadElement).textContent =  this.project.title;
        (this.element.querySelector('h3') as HTMLHeadElement).textContent =  this.persons + ' assigned';
        (this.element.querySelector('p') as HTMLParagraphElement).textContent =  this.project.description;
    }
}