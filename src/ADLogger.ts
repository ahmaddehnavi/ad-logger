import ADConsoleLogger from "./ADConsoleLogger";
import IADLogger, {ADLoggerParamType} from "./IADLogger";
import autobind from "autobind-decorator";

export enum LogLevel {
    disabled = 0,
    report = 100,
    error = 200,
    warn = 300,
    log = 400,
    info = 500,
    debug = 600,
}

export type ADLoggerConfigType = {
    logger?: IADLogger
    tag: string
    reportEnabled: boolean
    errorEnabled: boolean
    warnEnabled: boolean
    logEnabled: boolean
    infoEnabled: boolean
    debugEnabled: boolean
}

export type MessageType = string | boolean | number

@autobind
export class ADLogger {
    protected _config: ADLoggerConfigType = {
        logger: new ADConsoleLogger(),
        tag: 'ADLogger',
        reportEnabled: true,
        errorEnabled: true,
        warnEnabled: true,
        logEnabled: true,
        infoEnabled: true,
        debugEnabled: true,
    };

    constructor(config: Partial<ADLoggerConfigType> = {}) {
        this._config = {
            ...this._config,
            ...config
        };
    }

    public readonly LogLevel = LogLevel;
    public readonly Logger = {
        Disabled: undefined,
        Console: new ADConsoleLogger
    };


    setConfig(config: Partial<ADLoggerConfigType>) {
        this._config = {
            ...this._config,
            ...config
        };
        return this;
    }

    setLogLevel(logLevel: LogLevel) {
        this._config = {
            ...this._config,
            reportEnabled: logLevel >= LogLevel.report,
            errorEnabled: logLevel >= LogLevel.error,
            warnEnabled: logLevel >= LogLevel.warn,
            logEnabled: logLevel >= LogLevel.log,
            infoEnabled: logLevel >= LogLevel.info,
            debugEnabled: logLevel >= LogLevel.debug,
        };
        return this;
    }

    setLogger(logger?: IADLogger) {
        this._config.logger = logger;
    }

    protected prepareParam(p: Partial<{
        message: MessageType, tag: string,
        params: Array<any>
        error?: Error
    }>): ADLoggerParamType {
        return {
            tag: this._config.tag,
            message: String(p.message) || '',
            params: p.params || [],
            error: p.error
        }
    }

    withTag(tag: string) {
        return new ADLogger({
            ...this._config,
            tag: tag
        });
    }

    setTag(tag: string) {
        this._config = {
            ...this._config,
            tag: tag
        };
    }

    debug(message: MessageType, ...params: Array<any>) {
        this._config.debugEnabled &&
        this._config.logger &&
        this._config.logger.debug(this.prepareParam({
            message,
            params
        }));
        return this;
    }

    info(message: MessageType, ...params: Array<any>) {
        this._config.infoEnabled &&
        this._config.logger &&
        this._config.logger.info(this.prepareParam({
            message,
            params
        }));
        return this;
    }

    log(message: MessageType, ...params: Array<any>) {
        this._config.logEnabled &&
        this._config.logger &&
        this._config.logger.log(this.prepareParam({
            message,
            params
        }));
        return this;
    }

    warn(message: MessageType, error?: Error, ...params: Array<any>) {
        this._config.warnEnabled &&
        this._config.logger &&
        this._config.logger.warn(this.prepareParam({
            message,
            params,
            error
        }));
        return this;
    }

    error(message: MessageType, error?: Error, ...params: Array<any>) {
        this._config.errorEnabled &&
        this._config.logger &&
        this._config.logger.error(this.prepareParam({
            message,
            params,
            error
        }));
        return this;
    }


    report(message: MessageType, error?: Error, ...params: Array<any>) {
        this._config.reportEnabled &&
        this._config.logger &&
        this._config.logger.report(this.prepareParam({
            message,
            params,
            error
        }));
        return this;
    }

    clear() {
        this._config.logger &&
        this._config.logger.clear();
        return this;
    }

}

const ADLoggerInstance = new ADLogger();
export default ADLoggerInstance;
