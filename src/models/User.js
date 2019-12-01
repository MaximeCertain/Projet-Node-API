import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    capital: {
        type: Number,
        default: 0
    },
    user_type: {
        type: Schema.Types.ObjectID,
        ref: 'UserType',
        required: true
    },
    account_actions: [{
        type: Schema.Types.ObjectID,
        ref: 'AccountAction'
    }],
    bets: [{
        type: Schema.Types.ObjectID,
        ref: 'Bet'
    }]
});

const User = model('User', userSchema);
export default User;