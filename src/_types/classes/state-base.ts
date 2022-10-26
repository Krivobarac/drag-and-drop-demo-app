import { ListenerFn } from "../listener-fn.js";

export class StateBase<T> {
    protected listeners: ListenerFn<T>[] = [];

    addListeners(listenerFn: ListenerFn<T>) {
        this.listeners.push(listenerFn);
    }
}