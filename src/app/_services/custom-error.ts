export class ClientError extends Error {
    bodyObject: object = {};

    constructor(message: string, body: object) {
        super(message);
        this.bodyObject = body;

        Object.setPrototypeOf(this, ClientError.prototype);
    }

    getBody() {
        return this.bodyObject;
    }
}
