import Mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async () => {
    const localDB = process.env.DB_URL || '';

    await Mongoose.connect(
        localDB,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions,
        () => console.log('MongoDB Connected')
    );
};

export default connectDB;
