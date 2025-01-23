import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask, updateTask } from '../services/api';
import TaskForm from './TaskForm';

interface Task {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: string;
}

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleDelete = async (id: number) => {
        await deleteTask(id);
        loadTasks();
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
    };

    const handleCompleteToggle = async (task: Task) => {
        const updatedTask = { 
            ...task, 
            isCompleted: !task.isCompleted  // Toggle completion status
        };
    
        try {
            await updateTask(task.id, updatedTask);
            loadTasks();  // Refresh the task list after update
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Failed to update task.');
        }
    };
    
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-4">Task List</h1>
            <ul className="space-y-4">
                {tasks.map((task) => (
                    <li key={task.id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                checked={task.isCompleted}
                                onChange={() => handleCompleteToggle(task)}
                                className="w-5 h-5 cursor-pointer accent-green-500"
                            />
                            <div>
                                <h2 className={`text-lg font-semibold transition-all ${
        task.isCompleted ? 'completed-task' : ''
    }`}>
                                    {task.title}
                                </h2>
                                <p className="text-gray-700">{task.description}</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button 
                                onClick={() => handleEdit(task)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-all"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => handleDelete(task.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
    
            {editingTask && (
                <TaskForm
                    taskToEdit={editingTask}
                    onTaskCreated={() => {
                        setEditingTask(null);
                        loadTasks();
                    }}
                />
            )}
        </div>
    );
    
};

export default TaskList;
