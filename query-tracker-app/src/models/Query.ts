import { Schema, model, Document } from 'mongoose';

interface IQuery extends Document {
  content: string;
  createdAt: Date;
}

const querySchema = new Schema<IQuery>({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Query = model<IQuery>('Query', querySchema);

export default Query;