import { Schema, model, Types } from 'mongoose';

const reactionSchema = new Schema({
  reactionId: { 
    type: Schema.Types.ObjectId, 
    default: () => new Types.ObjectId() 
  },
  reactionBody: { 
    type: String, 
    required: [true, 'Reaction body is required'], 
    maxLength: [280, 'Reaction must be less than 280 characters'] 
  },
  username: { 
    type: String, 
    required: [true, 'Username is required for reaction'] 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const thoughtSchema = new Schema({
  thoughtText: { 
    type: String, 
    required: [true, 'Thought text is required'], 
    minLength: [1, 'Thought must be at least 1 character'], 
    maxLength: [280, 'Thought must be less than 280 characters'] 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  username: { 
    type: String, 
    required: [true, 'Username is required for thought'] 
  },
  reactions: [reactionSchema]
}, { timestamps: true }); // Optional: adds createdAt and updatedAt

const Thought = model('Thought', thoughtSchema);
export default Thought;
