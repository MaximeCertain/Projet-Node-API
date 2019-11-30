import {connect} from 'mongoose';
const connectDb = () => {
    return connect(`mongodb://localhost:27017/paris`, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
};

export default connectDb;