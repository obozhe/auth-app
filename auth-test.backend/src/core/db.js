import Mongoose from 'mongoose';

const connectDB = async () => {
    const localDB = process.env.DB_URL;

    await Mongoose.connect(
        localDB,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        () => console.log('MongoDB Connected')
    );
};

export default connectDB;
