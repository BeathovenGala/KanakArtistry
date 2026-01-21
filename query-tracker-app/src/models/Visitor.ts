import { Schema, model } from 'mongoose';

const visitorSchema = new Schema({
  ipAddress: {
    type: String,
    required: true,
  },
  visitTime: {
    type: Date,
    default: Date.now,
  },
});

const Visitor = model('Visitor', visitorSchema);

export default Visitor;