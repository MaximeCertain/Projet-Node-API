import {Schema, model} from 'mongoose';

const userType = new Schema({
    label:{
        type: String,
        required: true
    }
});

const UserType = model('UserType', userType);
export default UserType;