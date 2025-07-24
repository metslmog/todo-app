import { useState } from 'react';
import { updateTask } from '../api/tasks';
import axios from 'axios';

function TaskItem({ task, onDelete, onUpdate }) {
  const [completed, setCompleted] = useState(task.completed);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const iconButtonClass = "bg-white rounded-md border border-transparent p-1.5 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";


  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date)) return '';
    return date.toLocaleString(navigator.language, { month: 'short', day: 'numeric' });
  };

  const handleCheckboxChange = async () => {
    try {
      await axios.put(`/api/tasks/${task._id}`, { completed: !completed });
      setCompleted(!completed);
      // Optionally, you can call a prop function here to update the parent state
      // e.g., onToggle(task.id)
    } catch (error) {
      console.error('Failed to update task completion:', error);
      // Optionally, show an error message to the user
    }
  };

  const handleDeletion = async () => {
    try {
      await axios.delete(`/api/tasks/${task._id}`);
      // Call the parent's onDelete function to update the parent state
      if (onDelete) {
        onDelete(task._id);
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
      // Optionally, show an error message to the user
    }
  };

  const handleEdit = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await updateTask(task._id, editedTask);
      if (onUpdate) onUpdate(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  return (
    <li className="p-2 border bg-white">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="title"
            placeholder='Task name'
            value={editedTask.title}
            onChange={handleEdit}
            className="w-full p-1 border rounded"
          />
          <textarea
            name="description"
            placeholder='Task description'
            value={editedTask.description}
            onChange={handleEdit}
            className="w-full p-1 border rounded"
          />
          <input
            type="date"
            name="dueDate"
            placeholder='Due date'
            value={editedTask.dueDate}
            onChange={handleEdit}
            className="w-full p-1 border rounded"
          />
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleEdit}
            className="w-full p-1 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="flex justify-end gap-2">
            <button onClick={() => setIsEditing(false)} className="bg-grey rounded-md border border-transparent p-1.5 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
              Cancel
            </button>
            <button onClick={handleSave} className="bg-purple-900 rounded-md border border-transparent p-1.5 text-center text-sm transition-all text-white hover:bg-purple-1000 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
              Save
            </button>
            
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={completed}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <span>{task.title}</span>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setIsEditing(true)} className={iconButtonClass} type="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              </button>
              <button onClick={handleDeletion} className={iconButtonClass} type="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          {task.description && <p className="text-sm text-gray-600 ml-[22px] -mt-1">{task.description}</p>}
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 ml-[22px]">{formatDate(task.dueDate)}</span>
            <span className={`text-xs px-2 py-1 rounded ${
              task.priority === 'high' ? 'bg-red-100 text-red-800' :
              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {task.priority}
            </span>
          </div>
        </div>
      )}
    </li>
  );
}

export default TaskItem;