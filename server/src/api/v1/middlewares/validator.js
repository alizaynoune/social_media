import { userValidator } from '../validations/user.js';
import { validateConversation } from '../validations/conversation.js';
import { validateMessage } from '../validations/message.js';


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
        
        case 'create_message':
            return validateMessage.create;
        default:
            return [];
    }
}

// export default exports;

// exports.validate = validate;



