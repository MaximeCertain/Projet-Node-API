import {Schema, model} from 'mongoose';

const coteType = new Schema({
    label:{
        type: String,
        required: true
    },
    //soit equipe1gagne soit Null soit equipe 2 gagne
    code:{
        type:String,
        required: true
    }
});

const CoteType = model('CoteType', coteType);
export default CoteType;