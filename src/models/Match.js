import {Schema, model} from 'mongoose';
import Sport from "./Sport";
import Cote from "./Cote";

const matchSchema = new Schema({
    date: Date,
    adversaire1: String,
    adversaire2: String,
    sport:{
        type: Schema.Types.ObjectID,
        ref: 'Sport',
        required: true
    },
    cotes:[{
        type: Schema.Types.ObjectID,
        ref: 'Cote'
    }],
    //
    result:{
        type: String,
        default: ''
    }
});

const Match = model('Match', matchSchema);
export default Match;