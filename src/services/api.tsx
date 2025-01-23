import axios from 'axios';

const API_URL = 'http://localhost:5175/api/tasks';

export const getTasks = async () => {
    return axios.get(API_URL);
};

export const getTaskById = async (id: number) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createTask = async (task: { title: string; description: string }) => {
    try {
        const response = await axios.post(API_URL, task, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Task created successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};

export const updateTask = async (id: number, task: { id: number; title: string; description: string; isCompleted: boolean; createdAt: string }) => {
    return axios.put(`${API_URL}/${id}`, task, {
        headers: { 'Content-Type': 'application/json' },
    });
};



export const deleteTask = async (id: number) => {
    return axios.delete(`${API_URL}/${id}`);
};
