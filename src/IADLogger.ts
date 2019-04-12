export default interface IADLogger {
    intent(intent: number);

    debug(...p: Array<any>);

    info(...p: Array<any>);

    log(...p: Array<any>);

    error(...p: Array<any>);

    warn(...p: Array<any>);

    reportError(e: Error);

    reportEvent(
        name: string,
        props?: {
            [key: string]: string | number | boolean
        }
    );

    clear();
}