const EventPool : any = {

}

export function EventSubscribe(eventName: string, fn: Function) {
    if (!EventPool[eventName]) EventPool[eventName] = [];

    EventPool[eventName].push(fn);
    console.log(EventPool);
}

export function EventEmit(eventName : string, param : any) {
    console.log(EventPool, eventName)
    EventPool[eventName]?.forEach((fn: any) => fn(param));
}