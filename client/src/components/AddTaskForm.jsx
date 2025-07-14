import { useState } from 'react';
import axios from 'axios';

function AddTaskForm({ onTaskAdded }) {
    const [form, setForm] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/tasks', {...form, completed: false});
            console.log('Task created:', res.data);
            onTaskAdded(res.data); // Let parent component refresh task list
            setForm({
                title: '',
                description: '',
                dueDate: '',
                priority: 'medium',
            });
        } catch (err) {
            console.error('Error adding task:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded bg-gray-100">
            <h3 className="text-lg font-medium">Add Task</h3>
            <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Task Title"
                required
                className="w-full p-2 border rounded"
            />
            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Task Description"
                className="w-full p-2 border rounded"
            />
            <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />
            <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Add Task
            </button>
        </form>
    );


}

export default AddTaskForm;