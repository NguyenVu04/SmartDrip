

declare global {
    type CustomResponse<T> = {
        message: string;
        status: number;
        data: T;
    }
}

export {}