export abstract class ComponentBase<THostElement extends HTMLElement, TElement extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: THostElement;
    element: TElement;

    constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
        this.templateElement = document.getElementById(templateId) as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId) as THostElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as TElement;

        if (newElementId) this.element.id = newElementId;

        this.attach(insertAtStart);
    }

    protected abstract renderContent(): void;
    protected abstract configure(): void;

    protected attach(insertAtStart: boolean) {
        this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
    }
}