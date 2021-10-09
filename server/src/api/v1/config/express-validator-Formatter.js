export const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    return {
        msg: msg.name || msg,
        param,
        location,
        code: msg.code,
        value, // delete this line if you do not want to display value
        nestedErrors: nestedErrors ? nestedErrors.map(this.errorFormatter) : []
    };
};

