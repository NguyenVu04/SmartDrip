

declare global {
    type CustomResponse<T> = {
        success: boolean;
        message: string;
        status: number;
        data: T;
    }
}

export {}