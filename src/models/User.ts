import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { 
    type: String, 
    unique: true, 
    required: [true, 'Username is required'], 
    trim: true 
  },
  email: { 
    type: String, 
    unique: true, 
    required: [true, 'Email is required'], 
    match: [/.+@.+\..+/, 'Please enter a valid email address'] 
  },
  thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });  // ✅ Adds createdAt / updatedAt automatically

const User = model('User', userSchema);
export default User;
