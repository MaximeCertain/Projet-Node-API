const mongoose = require('mongoose');
import {Schema, model} from 'mongoose';

const coteSchema = new Schema({
    cote: {
        type: Number
    },
    type: {
        type: Schema.Types.ObjectID,
        ref: 'CoteType'
    },
    match:{
        type: Schema.Types.ObjectID,
        ref: 'Match'
    },
    validation:{
        type: Boolean,
        default: null
    }
});

const Cote = model('Cote', coteSchema);
export default Cote;