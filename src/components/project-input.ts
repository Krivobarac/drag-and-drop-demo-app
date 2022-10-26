import { ComponentBase } from '../_types/classes/component-base.js';
import { ProjectStatus } from '../_types/enums/project-status.js';
import { ProjectState } from '../_states/project-state.js';
import { autobind } from './../_decorators/autobind.js';

interface Validatable {
    value: string | number;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    min?: number;
    max?: number;
}

export class ProjectInput extends ComponentBase<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', false, 'user-input');

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
        
        this.configure();
    }

    protected configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    protected renderContent(): void { }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();

        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            ProjectState.getInstance().addProject(title, description, people, ProjectStatus.ACTIVE);
            this.element.reset();
        }
    }

    private gatherUserInput(): [string, string, number] | void {
        const validatableTitle: Validatable = {
            value: this.titleInputElement.value,
            required: true
        }

        const validatableDescription: Validatable = {
            value: this.descriptionInputElement.value,
            required: true,
            minLength: 5
        }

        const validatablePeople: Validatable = {
            value: this.peopleInputElement.value,
            required: true,
            min: 1
        }

        if (
            !this.validate(validatableTitle) ||
            !this.validate(validatableDescription) ||
            !this.validate(validatablePeople)
        ) {
            alert(`Invalid input, please try again!`)
        } else {
            return [this.titleInputElement.value, this.descriptionInputElement.value, +this.peopleInputElement.value];
        }
    }

    private validate(validatableInput: Validatable) {
        let isValid = true;

        if (validatableInput.required) {
            isValid = isValid && validatableInput.value.toString().trim().length !== 0;
        }

        if (validatableInput.minLength && typeof validatableInput.value === 'string') {
            isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
        }

        if (validatableInput.maxLength && typeof validatableInput.value === 'string') {
            isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
        }

        if (validatableInput.min && typeof +validatableInput.value === 'number') {
            isValid = isValid && +validatableInput.value >= validatableInput.min;
        }

        if (validatableInput.max && typeof +validatableInput.value === 'number') {
            isValid = isValid && +validatableInput.value <= validatableInput.max;
        }

        return isValid;
    }

}