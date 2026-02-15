class ErrorResponse extends Error
{
    constructor(message,statuscode)
    {
        super(message);
        this.statuscode=statuscode;
    }
}
export default ErrorResponse;
/*Extends the built-in Error class:

This gives it all the standard error properties like message and stack.

Adds statusCode:

This is the HTTP status code we want to return (like 401, 403, 404) */
