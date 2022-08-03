import Mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async () => {
    if (!process.env.MONGO_URL) {
        throw new Error('MongoDB URL is not set');
    }

    await Mongoose.connect(
        process.env.MONGO_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions,
        () => console.log('MongoDB Connected')
    );
};

export default connectDB;
