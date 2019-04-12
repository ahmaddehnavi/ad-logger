export type ADLoggerParamType = {
    tag: string,
    message: string
    params: Array<any>
    error?: Error
}
export default interface IADLogger {
    debug(p: ADLoggerParamType);

    info(p: ADLoggerParamType);

    log(p: ADLoggerParamType);

    error(p: ADLoggerParamType);

    report(p: ADLoggerParamType);

    warn(p: ADLoggerParamType);

    clear();
}