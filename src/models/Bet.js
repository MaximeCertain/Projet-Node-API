const mongoose = require('mongoose');
import {Schema, model} from 'mongoose';

const betSchema = new Schema({
    amount: {
        type: Number
    },
    date:{
        type:Date,
        default: () => Date.now() + 7*24*60*60*1000
    },
    user: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    cote:{
        type: Schema.Types.ObjectID,
        ref: 'Cote'
    }
});

const Bet = model('Bet', betSchema);
export default Bet;