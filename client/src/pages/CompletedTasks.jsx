import { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "../components/TaskList";

function CompletedTasks() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    const fetchTasks = async () => {
        try {
            const res = await axios.get('/api/tasks?completed=true');
            setTasks(res.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching tasks:', err);
            setError('Failed to fetch completed tasks. Please try again later.');
        }
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task._id !== taskId));
    };

    const handleUpdateTask = (updatedTask) => {
        setTasks((prevTasks) => 
            prevTasks.map(task => task._id === updatedTask._id ? updatedTask : task)
        );
    };

    useEffect(() => { fetchTasks(); }, []);
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Completed Tasks</h1>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <TaskList tasks={tasks} onDelete={handleDeleteTask} onUpdate={handleUpdateTask} />
        </div>
    );
}


export default CompletedTasks;
