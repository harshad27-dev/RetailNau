// ============================================================
// AppError — custom error class with HTTP status code
// ============================================================

export class AppError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
        this.name = "AppError";
        // Maintains proper stack trace in V8
        Error.captureStackTrace(this, this.constructor);
    }
}
