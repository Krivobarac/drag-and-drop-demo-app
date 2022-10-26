import { ComponentBase } from "../_types/classes/component-base.js";
import { Project } from "../_types/interfaces/project.js";

export class SingleProject extends ComponentBase<HTMLUListElement, HTMLLIElement> {

    constructor(private project: Project) {
        super('single-project', project.hostId, false);

        this.renderContent();
    }

    get persons(): string {
        const personsText = this.project.people + ' person';
        return this.project.people === 1 ? personsText : personsText + 's';
    }

    protected renderContent(): void {
        (this.element.querySelector('h2') as HTMLHeadElement).textContent =  this.project.title;
        (this.element.querySelector('h3') as HTMLHeadElement).textContent =  this.persons + ' assigned';
        (this.element.querySelector('p') as HTMLParagraphElement).textContent =  this.project.description;
    }
}