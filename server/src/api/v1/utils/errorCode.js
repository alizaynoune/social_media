
// code error
export const ERROR_CODE = {
    // CREATED: {message : 'created', code : 201, statusCode : 201},
    VALIDATION_ERROR: { name: 'validation error', code: 100, statusCode: 400 },
    // EMAIL VALIDATION
    EMAIL_REQUIRED: { name: 'email required', code: 101, statusCode: 400 },
    EMAIL_INVALID: { name: 'email invalid', code: 102, statusCode: 400 },
    EMAIL_ALREADY_TAKEN: { name: 'email already taken', code: 103, statusCode: 400 },

    // PASSWORD VALIDATION
    PASSWORD_REQUIRED: { name: 'password required', code: 104, statusCode: 400 },
    PASSWORD_INVALID: { name: 'password must be least 8 characters, numbers, letters, special characters, capital characters', code: 105, statusCode: 400 },
    PASSWORD_MUST_BE_LEAST_8_CHARACTERS: { name: 'password must be least 8 characters', code: 106, statusCode: 400 },
    PASSWORD_MUST_BE_AT_NUMBER_LETTER_SPECIAL_CHARACTER: { name: 'password must be at number, letter, special character', code: 107, statusCode: 400 },

    // CONFIRM PASSWORD VALIDATION
    CONFIRM_PASSWORD_REQUIRED: { name: 'confirm password required', code: 108, statusCode: 400 },
    CONFIRM_PASSWORD_NOT_MATCH: { name: 'confirm password not match', code: 109, statusCode: 400 },


    //FIRST NAME VALIDATION
    FIRST_NAME_REQUIRED: { name: 'first name required', code: 110, statusCode: 400 },
    FIRST_NAME_INVALID: { name: 'first name must be leat 3 characters', code: 111, statusCode: 400 },

    //LAST NAME VALIDATION
    LAST_NAME_REQUIRED: { name: 'last name required', code: 112, statusCode: 400 },
    LAST_NAME_INVALID: { name: 'last name must be leat 3 characters', code: 113, statusCode: 400 },

    //PHONE NUMBER VALIDATION
    PHONE_NUMBER_REQUIRED: { name: 'phone number required', code: 114, statusCode: 400 },
    PHONE_NUMBER_INVALID: { name: 'phone number must be 10 digits', code: 115, statusCode: 400 },

    // GANDER VALIDATION
    GANDER_REQUIRED: { name: 'gander required', code: 116, statusCode: 400 },
    GANDER_INVALID: { name: 'gander must be m or f', code: 117, statusCode: 400 },

    // BIRTHDAY VALIDATION
    BIRTHDAY_REQUIRED: { name: 'birthday required', code: 118, statusCode: 400 },
    BIRTHDAY_INVALID: { name: 'birthday must be in format yyyy-mm-dd', code: 119, statusCode: 400 },

    // ROLE VALIDATION
    ROLE_REQUIRED: { name: 'role required', code: 120, statusCode: 400 },
    ROLE_INVALID: { name: 'role must be admin or user', code: 121, statusCode: 400 },

    // AVATAR VALIDATION
    AVATAR_REQUIRED: { name: 'avatar required', code: 122, statusCode: 400 },
    AVATAR_INVALID: { name: 'avatar must be jpg, jpeg, png, gif', code: 123, statusCode: 400 },

    // NO UPDATE
    NO_UPDATE: { name: 'no update', code: 124, statusCode: 400 },


    // PERMISSION DENIED
    PERMISSION_DENIED: { name: 'permission denied', code: 125, statusCode: 400 },

    // ACCSESS DENIED
    ACCESS_DENIED: { name: 'access denied', code: 126, statusCode: 400 },


    // INTERNAL SERVER ERROR
    INTERNAL_SERVER_ERROR: { name: 'internal server error', code: 127, statusCode: 500 },

    // DATABASE ERROR
    DATABASE_ERROR: { name: 'database error', code: 128, statusCode: 500 },
    DATABASE_CONNECTION_ERROR: { name: 'database connection error', code: 129, statusCode: 500 },
    DATABASE_CONNECTION_TIMEOUT: { name: 'database connection timeout', code: 130, statusCode: 500 },
    DATABASE_DUPLICATE_VALUE_ENTERED: { name: 'database duplicate value entered', code: 131, statusCode: 400 },
    RESOURCE_NOT_FOUND_WITH_ID: { name: 'resource not found with id', code: 132, statusCode: 500 },


    // USER ERROR
    INVALID_CREDENTIALS: { name: 'invalid credentials', code: 133, statusCode: 400 },

    // HEADER ERROR
    NO_AUTHORIZATION_HEADER: { name: 'no authorization header', code: 134, statusCode: 400 },
    INVALID_AUTHORIZATION_HEADER: { name: 'invalid authorization header', code: 135, statusCode: 400 },


    // TOKEN ERROR
    INVALID_TOKEN: { name: 'invalid token', code: 136, statusCode: 400 },
    TOKEN_EXPIRED: { name: 'token expired', code: 137, statusCode: 400 },
    // EXPIRED_TOKEN: { name: 'expired token', code: 137, statusCode: 400 },


    // BEARER TOKEN ERROR
    INVALID_BEARER_TOKEN: { name: 'invalid bearer token', code: 138, statusCode: 400 },
    EXPIRED_BEARER_TOKEN: { name: 'expired bearer token', code: 139, statusCode: 400 },
    MALFORMED_BEARER_TOKEN: { name: 'malformed bearer token', code: 140, statusCode: 400 },

    // user not found
    USER_NOT_FOUND: { name: 'user not found', code: 141, statusCode: 400 },

    SEARCH_INVALID: { name: 'search invalid', code: 142, statusCode: 400 },
    PAGE_INVALID: { name: 'page invalid', code: 143, statusCode: 400 },
    LIMIT_INVALID: { name: 'limit invalid', code: 144, statusCode: 400 },
    SORT_BY_INVALID: { name: 'sort by invalid', code: 145, statusCode: 400 },

    // conversation
    CONVERSATION_NOT_FOUND: { name: 'conversation not found', code: 146, statusCode: 400 },
    CONVERSATION_MEMBER_NOT_FOUND: { name: 'conversation member not found', code: 147, statusCode: 400 },
    CONVERSATION_MEMBER_REQUIRED: { name: 'conversation member required', code: 148, statusCode: 400 },
    CONVERSATION_MEMBER_INVALID: { name: 'conversation member invalid', code: 149, statusCode: 400 },

    USER_ALREADY_BLOCKED: { name: 'user already blocked', code: 150, statusCode: 400 },
    USER_NOT_BLOCKED: { name: 'user not blocked', code: 151, statusCode: 400 },
    YOU_CAN_NOT_BLOCK_YOURSELF: { name: 'you can not block yourself', code: 152, statusCode: 400 },
    YOU_CAN_NOT_CREATE_CONVERSATION_WITH_YOURSELF: { name: 'you can not create conversation with yourself', code: 153, statusCode: 400 },
    YOU_CAN_NOT_CREATE_CONVERSATION_WITH_BLOCKED_USERS: { name: 'you can not create conversation with blocked users', code: 154, statusCode: 400 },
    YOU_CAN_NOT_CREATE_CONVERSATION_WITH_NOT_EXISTING_USERS: { name: 'you can not create conversation with not existing users', code: 155, statusCode: 400 },
    CONVERSATION_MEMBER_ALREADY_EXIST: { name: 'conversation member already exist', code: 156, statusCode: 400 },
    CONVERSATION_MEMBER_NOT_EXIST: { name: 'conversation member not exist', code: 157, statusCode: 400 },

    YOU_ALREADY_BLOCKED_FROM_THIS_USER: { name: 'you already blocked from this user', code: 158, statusCode: 400 },
    YOU_DONT_HAVE_ENOUGH_PERMISSION: { name: 'you dont have enough permission', code: 159, statusCode: 400 },
    SELECTOR_INVALID: { name: 'selector invalid', code: 160, statusCode: 400 },

    MESSAGE_NOT_FOUND: { name: 'message not found', code: 161, statusCode: 400 },
    MESSAGE_NOT_FOUND_WITH_ID: { name: 'message not found with id', code: 162, statusCode: 400 },
    MESSAGE_NOT_CREATED: { name: 'message not created', code: 163, statusCode: 400 },
    MESSAGE_NOT_UPDATED: { name: 'message not updated', code: 164, statusCode: 400 },
    MESSAGE_NOT_DELETED: { name: 'message not deleted', code: 165, statusCode: 400 },
    MESSAGE_CAN_NOT_BE_DELETED: { name: 'message can not be deleted', code: 166, statusCode: 400 },

    MESSAGE_IS_REQUIRED: { name: 'message is required', code: 167, statusCode: 400 },
    MESSAGE_IS_INVALID: { name: 'message is invalid', code: 168, statusCode: 400 },
    MESSAGE_IS_TOO_LONG: { name: 'message is too long', code: 169, statusCode: 400 },
    MESSAGE_IS_TOO_SHORT: { name: 'message is too short', code: 170, statusCode: 400 },
    MESSAGE_INVALID_LENGTH: { name: 'message invalid length min 3, max 255', code: 171, statusCode: 400 },


};


// export default ERROR_CODE;
