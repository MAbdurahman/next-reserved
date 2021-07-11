import mongoose from 'mongoose';

const connectDatabase = () => {
   if (mongoose.connection.readyState >= 1) {
      return;
   }
   mongoose.connect(process.env.MONGO_DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
   .then(con => console.log('connected to local mongo database!'));
}

export default connectDatabase;