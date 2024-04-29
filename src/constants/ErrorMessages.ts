/**
 * Enum representing error messages.
 */
enum ErrorMessages {
    /**
     * Error message for invalid credentials.
     * This message is displayed when the provided email or password is incorrect.
     */
    INVALID_CREDENTIALS = "Email or password is incorrect",

    /**
     * Error message for email already in use.
     * This message is displayed when the provided email is already registered with an account.
     */
    EMAIL_IN_USE = "Provided email is already registered with an account",
}

export default  ErrorMessages ;
