import { Request, Response, NextFunction } from 'express';

export interface ErrorResponse {
    error: string;
    message: string;
    statusCode: number;
    details?: any;
}

export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: 'Error',
            message: err.message,
            statusCode: err.statusCode,
        });
    }

    // Handle Prisma errors
    if (err.name === 'PrismaClientKnownRequestError') {
        return res.status(400).json({
            error: 'Database Error',
            message: 'A database error occurred',
            statusCode: 400,
        });
    }

    // Handle validation errors
    if (err.name === 'ZodError') {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Invalid request data',
            statusCode: 400,
            details: err,
        });
    }

    // Default error
    console.error('❌ Unhandled Error:', err);
    return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Something went wrong',
        statusCode: 500,
    });
};
