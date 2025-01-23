import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App: React.FC = () => {
    const [refresh, setRefresh] = useState(false);

    const handleTaskCreated = () => {
        setRefresh(!refresh);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">To-Do List App</h1>
            <TaskForm onTaskCreated={handleTaskCreated} />
            <TaskList key={refresh.toString()} />
        </div>
    );
};

export default App;

