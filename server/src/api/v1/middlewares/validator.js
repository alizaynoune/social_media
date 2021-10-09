import { userValidator } from '../validations/user.js';
import { validateConversation } from '../validations/conversation.js';


export const method = (method) => {
    // console.log(method);
    // var errors = [];
    switch (method) {
        case 'create':
            return userValidator.createUser;
        case 'update':
            return userValidator.updateUser;
        case 'login':
            return userValidator.login;
        case 'query':
            return userValidator.query;
        case 'create_conversation':
            return validateConversation.create;
        default:
            return [];
    }
}

// export default exports;

// exports.validate = validate;



