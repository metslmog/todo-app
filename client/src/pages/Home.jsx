import { useEffect, useState } from 'react';
import { getTasks } from '../api/tasks';
import axios from 'axios';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';
import { set } from 'mongoose';

function Home() {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        getTasks(false)
            .then(res => setTasks(res.data))
            .catch(err => console.error('Error fetching tasks:', err));
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task._id !== taskId));
    };

    const handleUpdateTask = (updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map(task => task._id === updatedTask._id ? updatedTask : task)
        );
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Daily Focus</h1>
            <AddTaskForm onTaskAdded={() => fetchTasks()} />
            <p className="text-sm">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</p>
            <TaskList tasks={tasks} onDelete={handleDeleteTask} onUpdate={handleUpdateTask} />
        </div>
    );
}

export default Home;