import { Document, Schema, model, models } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  clerkId: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  photo: string;
}

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  photo: {
    type: String,
    required: true
  }
});

const User = models.User || model<IUser>('User', UserSchema);

export default User;
