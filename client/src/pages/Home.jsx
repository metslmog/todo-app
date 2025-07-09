import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from '../components/TaskItem';

function Home() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/tasks')
            .then(res => {
                console.log('Tasks received:', res.data);
                setTasks(res.data);
            })
            .catch(err => console.error('Error fetching tasks:', err));
    }, []);

    return (
        <div className="min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Daily Focus</h1>
            <p className="text-sm">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</p>
            <ul className="space-y-2">
                {tasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </ul>
        </div>
    );
}

export default Home;