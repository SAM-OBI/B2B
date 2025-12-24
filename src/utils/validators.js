/**
 * Validates an email address against a standard regex pattern.
 * @param {string} email 
 * @returns {boolean}
 */
export const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
};

/**
 * Validates a password to ensure it is strong.
 * Criteria: 
 * - At least 8 characters long
 * - Contains at least one uppercase letter
 * - Contains at least one lowercase letter
 * - Contains at least one number
 * - Contains at least one special character (!@#$%^&*)
 * @param {string} password 
 * @returns {boolean}
 */
export const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
};

export const PASSWORD_REQUIREMENTS = "Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.";
