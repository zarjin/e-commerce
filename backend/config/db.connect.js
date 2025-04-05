import mongoose from 'mongoose';

const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log({ message: 'Successfully connected to MongoDB' });
  } catch (error) {
    console.error({
      message: 'Failed to connect to MongoDB',
      error: error.message,
    });
  }
};

export default dbconnect;
