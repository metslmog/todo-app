import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    dueDate: Date,
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    project: String,
    completed: { type: Boolean, default: false }
}, {
    timestamps: true // adds createdAt and updatedAt fields
});

export default mongoose.model('Task', taskSchema);