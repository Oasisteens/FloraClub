export interface IReporter {
    getReport(): Report;
}

export interface Report {
    DEPENDENCIES: number;
    CLASS_NAME: string;
    PUBLIC_METHODS: number;
    PRIVATE_METHODS: number;
    CLASS_LINES: number;
    AVERAGE_METHOD_LINES: number;
    MAX_METHOD_LINES: number;
}