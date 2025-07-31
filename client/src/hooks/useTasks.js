import { useState, useEffect } from 'react';
import { addTask, deleteTask, getTasks, updateTask } from '../api/tasks';

export default function useTasks(initialCompleted = false) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const res = await getTasks(initialCompleted);
            setTasks(res.data);
        } catch (err) {
            console.error('Error fetching tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    const addNewTask = async (taskData) => {
        setLoading(true);
        try {
            const res = await addTask(taskData);
            setTasks((prevTasks) => [...prevTasks, res.data]);
            return res.data; // Return the newly added task
        } catch (err) {
            console.error('Error adding task:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateExistingTask = async (id, taskData) => {
        setLoading(true);
        try {
            const res = await updateTask(id, taskData);
            setTasks((prevTasks) =>
                prevTasks.map(task => (task._id === id ? res.data : task))
            );
            return res.data; // Return the updated task
        } catch (err) {
            console.error('Error updating task:', err);
        } finally {
            setLoading(false);
        }
    };

    const deleteExistingTask = async (id) => {
        setLoading(true);
        try {
            await deleteTask(id);
            setTasks((prevTasks) => prevTasks.filter(task => task._id !== id));
        } catch (err) {
            console.error('Error deleting task:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return {
        tasks,
        loading,
        fetchTasks,
        addNewTask,
        updateExistingTask,
        deleteExistingTask
    };
}