import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';

function Home() {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        axios.get('/api/tasks?completed=false')
            .then(res => {
                console.log('Tasks received:', res.data);
                setTasks(res.data);
            })
            .catch(err => console.error('Error fetching tasks:', err));
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task._id !== taskId));
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Daily Focus</h1>
            <AddTaskForm onTaskAdded={() => fetchTasks()} />
            <p className="text-sm">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</p>
            <TaskList tasks={tasks} onDelete={handleDeleteTask} />
        </div>
    );
}

export default Home;