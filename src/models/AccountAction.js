import {Schema, model} from 'mongoose';
const DEPOSIT = "deposit";
const WITHDRAWAL = "withdrawal";
const accountAction = new Schema({
    type: {
        type: String
    },
    amount:{
        type: Number
    }
});

const AccountAction = model('AccountAction', accountAction);
export default AccountAction;