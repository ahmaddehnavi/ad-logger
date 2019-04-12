import IADLogger, {ADLoggerParamType} from "./IADLogger";

export default class ADConsoleLogger implements IADLogger {
    clear() {
        console.clear()
    }

    debug(p: ADLoggerParamType) {
        console.debug(p.tag, p.message, ...p.params);
    }

    error(p: ADLoggerParamType) {
        console.error(p.tag, p.message, ...p.params);
    }

    report(p: ADLoggerParamType) {
        console.error(p.tag, p.message, p.error, ...p.params);
    }

    info(p: ADLoggerParamType) {
        console.info(p.tag, p.message, ...p.params);
    }

    log(p: ADLoggerParamType) {
        console.log(p.tag, p.message, ...p.params);
    }

    warn(p: ADLoggerParamType) {
        console.warn(p.tag, p.message, ...p.params);
    }

}