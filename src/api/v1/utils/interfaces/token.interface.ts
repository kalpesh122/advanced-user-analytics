import { Schema } from 'mongoose';

type Token = {
  id: Schema.Types.ObjectId;
  expiresIn: number;
} & Object;

export default Token;
