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
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        setIsModalOpen(true);
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
            <h1 className={`text-2xl font-bold text-center ${tasks.length === 0 ? 'empty' : ''}`}>Task List</h1>
            <ul className={` ${tasks.length === 0 ? 'empty' : ''}`}>
                {tasks.map((task) => (
                    <li key={task.id} className="task-item">
                        <div className="task-content">
                            <h2 className={`text-lg font-semibold ${task.isCompleted ? 'completed-task' : ''}`}>
                                {task.title}
                            </h2>
                            <p className={`text-gray-700 task-description ${task.isCompleted ? 'completed-task' : ''}`}>
                                {task.description}
                            </p>
                        </div>
                        <div className="checkbox-container">
                            <label>Done?</label>
                            <input
                                type="checkbox"
                                checked={task.isCompleted}
                                onChange={() => handleCompleteToggle(task)}
                                className="w-5 h-5 cursor-pointer accent-green-500"
                            />
                        </div>
                        <div className="task-actions">
                            <button 
                                onClick={() => handleEdit(task)}
                                className="edit"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => handleDelete(task.id)}
                                className="delete"
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
            {isModalOpen && (
                <div className="modal active">
                    <div className="modal-content">
                        <TaskForm
                            taskToEdit={editingTask}
                            onTaskCreated={() => {
                                setEditingTask(null);
                                loadTasks();
                                setIsModalOpen(false); // Close modal after task update
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskList;
