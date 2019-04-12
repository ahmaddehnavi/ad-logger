import IADLogger from "./IADLogger";

export default class ADConsoleLogger implements IADLogger {
    private _intent = '';

    intent(intent: number) {
        this._intent = new Array(intent * 2 + 1)
            .map(() => ' ')
            .join(' ');
        return this;
    }

    debug(...p: Array<any>) {
        console.log(this._intent, ...p);
        return this;
    }

    info(...p: Array<any>) {
        console.log(this._intent, ...p);
        return this;
    }

    log(...p: Array<any>) {
        console.log(this._intent, ...p);
        return this;
    }

    error(...p: Array<any>) {
        console.error(this._intent, ...p);
        return this;
    }

    warn(...p: Array<any>) {
        console.warn(this._intent, ...p);
        return this;
    }

    clear() {
        console.clear();
        return this;
    }

    reportError(e: Error) {
        console.error('Report Error :', e);
        return this;
    }

    reportEvent(name: string, props?: { [p: string]: string | number | boolean }) {
        console.log('Report Event :', name, props);
        return this;
    }

}