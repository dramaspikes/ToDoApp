import React, { useState } from 'react';
import { createTask, updateTask } from '../services/api';

interface Task {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: string;
}

const TaskForm: React.FC<{ onTaskCreated: () => void; taskToEdit?: Task | null }> = ({ onTaskCreated, taskToEdit }) => {
    const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : '');
    const [description, setDescription] = useState(taskToEdit ? taskToEdit.description : '');
    const [isCompleted, setIsCompleted] = useState(taskToEdit ? taskToEdit.isCompleted : false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() === '' || description.length < 10) {
            alert('Title is required and description must be at least 10 characters long.');
            return;
        }

        if (taskToEdit) {
            await updateTask(taskToEdit.id, { id: taskToEdit.id, title, description, isCompleted, createdAt: taskToEdit.createdAt });
        } else {
            await createTask({ title, description });
        }

        setTitle('');
        setDescription('');
        setIsCompleted(false);
        onTaskCreated();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-center">{taskToEdit ? 'Edit Task' : 'Add New Task'}</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:ring-2 focus:ring-blue-500"
            />
            <textarea
                placeholder="Description (min 10 chars)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all">
                {taskToEdit ? 'Update Task' : 'Add Task'}
            </button>
        </form>
    );
};


export default TaskForm;
