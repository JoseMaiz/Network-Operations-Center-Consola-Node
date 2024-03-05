
export enum LogSeverityLevel {
    low    = 'low',
    medium = 'medium',
    high   = 'high',
}
export interface LogEntityOptions {
    createdAt?: Date;
    level: LogSeverityLevel;
    message: string;
    origin: string;
}
export class LogEntity {

    public level: LogSeverityLevel; //* (Severity level)
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options:LogEntityOptions){
        const {message,level,origin,createdAt = new Date()} = options
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin
    }

    // *Transfor information JSON.stringify provided for the file saved in a instance of the class LogEntity
    static fromJson(json:string):LogEntity{

        const {message, level, createdAt,origin} = JSON.parse(json);

        const log = new LogEntity({
            message,
            level,
            origin,
            createdAt: new Date(createdAt),
        });

        return log;
    };

    static fromObject(object: {[key:string]: any}):LogEntity {

        const {message, level, createdAt, origin} = object;
        
        const log = new LogEntity({
            message, 
            level, 
            origin,
            createdAt,
        });

        return log;
    }
}

