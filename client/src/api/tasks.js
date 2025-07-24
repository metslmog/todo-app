import axios from 'axios';

export const getTasks = (completed = null) => {
    const query = completed !== null ? `?completed=${completed}` : '';
    return axios.get(`/api/tasks${query}`);
};

export const addTask = (task) => {
    return axios.post('/api/tasks', task);
};

export const updateTask = (id, task) => {
    return axios.put(`/api/tasks/${id}`, task);
}

export const deleteTask = (id) => {
    return axios.delete(`/api/tasks/${id}`);
};