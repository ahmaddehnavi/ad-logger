import ADConsoleLogger from "./ADConsoleLogger";
import IADLogger from "./IADLogger";
import autobind from "autobind-decorator";

export enum LogLevel {
    disabled,
    reportError,
    reportEvent,
    error,
    warn,
    log,
    info,
    debug,
}

@autobind
class ADLogger implements IADLogger {
    protected _logger?: IADLogger = new ADConsoleLogger();
    public enabled = {
        reportError: true,
        reportEvent: true,
        error: true,
        warn: true,
        log: true,
        info: true,
        debug: true,
    };

    public readonly LogLevel = LogLevel;

    public Logger = {
        Disabled: undefined,
        Console: new ADConsoleLogger
    };

    setLogLevel(logLevel: LogLevel) {
        this.enabled = {
            reportEvent: logLevel >= LogLevel.reportEvent,
            reportError: logLevel >= LogLevel.reportError,
            error: logLevel >= LogLevel.error,
            warn: logLevel >= LogLevel.warn,
            log: logLevel >= LogLevel.log,
            info: logLevel >= LogLevel.info,
            debug: logLevel >= LogLevel.debug,
        };
        return this;
    }

    setLogger(logger?: IADLogger) {
        this._logger = logger;
    }

    debug(...p: Array<any>) {
        this.enabled.debug &&
        this._logger &&
        this._logger.log(...p);
        return this;
    }

    info(...p: Array<any>) {
        this.enabled.info &&
        this._logger &&
        this._logger.log(...p);
        return this;
    }

    log(...p: Array<any>) {
        this.enabled.log &&
        this._logger &&
        this._logger.log(...p);
        return this;
    }

    warn(...p: Array<any>) {
        this.enabled.warn &&
        this._logger &&
        this._logger.warn(...p);
        return this;
    }

    error(...p: Array<any>) {
        this.enabled.error &&
        this._logger &&
        this._logger.error(...p);
        return this;
    }

    clear() {
        this._logger &&
        this._logger.clear();
        return this;
    }

    intent(intent: number) {
        this.enabled.error &&
        this._logger &&
        this._logger.intent(intent);
        return this;
    }

    reportError(e: Error) {
        this.enabled.reportError &&
        this._logger &&
        this._logger.reportError(e);
        return this;
    }

    reportEvent(name: string, props?: { [p: string]: string | number | boolean }) {
        this.enabled.reportEvent &&
        this._logger &&
        this._logger.reportEvent(name, props);
        return this;
    }

}

const ADLoggerInstance = new ADLogger();
/**
 * @deprecated
 */
export const log = ADLoggerInstance.log;
export default ADLoggerInstance;
