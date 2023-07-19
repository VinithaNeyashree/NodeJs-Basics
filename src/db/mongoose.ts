import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect('mongodb+srv://nodejsprojects:node123@cluster0.ftogmgn.mongodb.net/basic', {
    
    });
    console.log('Connected to DB !!');
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default InitiateMongoServer;
