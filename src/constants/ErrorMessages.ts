/**
 * Enum representing error messages.
 */
enum ErrorMessages {
    /**
     * Error message indicating the provided email or password is incorrect.
     */
    INVALID_CREDENTIALS = "Email or password is incorrect",

    /**
     * Error message indicating the provided email is already registered with an account.
     */
    EMAIL_IN_USE = "Provided email is already registered with an account",

    /**
     * Error message indicating access denial due to lack of authentication token.
     */
    ACCESS_DENIED_NO_TOKEN = "Access denied. No token provided",

    /**
     * Error message indicating access denial due to an invalid authentication token.
     */
    INVALID_TOKEN = "The token provided is invalid",

    /**
     * Error message indicating that user information is absent in the authentication token,
     */
    MISSING_USER_DATA = "User information absent in authentication token"

}

export default ErrorMessages;
