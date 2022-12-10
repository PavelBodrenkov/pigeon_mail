module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError(message, errors) {
        return new ApiError(401, message, errors)
    }

    static ConflictError(message, errors=[]) {
        return new ApiError(409, message, errors);
    }

    static NotFoundError(message, errors=[]) {
        return new ApiError(404, message, errors);
    }
}