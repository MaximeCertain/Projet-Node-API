import {Schema, model} from 'mongoose';

const sportSchema = new Schema({
    label: {
        type: String,
        required: true
    }
});

const Sport = model('Sport', sportSchema);
export default Sport;