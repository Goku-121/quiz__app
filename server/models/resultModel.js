import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  username: String,
  attempts: Number,
  points: Number,
  achieved: String,  
  answers: [Number],  
});

export default mongoose.model('Result', resultSchema);
