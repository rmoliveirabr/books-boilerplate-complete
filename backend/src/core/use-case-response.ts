export class Error<E, R> {
    private _error;

    constructor(error:E) { this._error = error; }

    isError() { return true; }
    getError(): E | null { return this._error; }
    getResponse(): R | null { return null; }
}

export class Response<E, R> {
    private _response;

    constructor(response:R) { this._response = response; }

    isError() { return false; }
    getError(): E | null { return null; }
    getResponse(): R | null { return this._response; }

}

export type UseCaseResponse<E, R> = Error<E, R> | Response<E, R>;

