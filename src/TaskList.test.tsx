import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskList from './components/TaskList';
import React from 'react';

// Mock the API services to avoid actual API calls
jest.mock('./services/api', () => {
  return {
    getTasks: jest.fn(),
    deleteTask: jest.fn(),
    updateTask: jest.fn(),
  };
});

describe('TaskList Component', () => {
  const mockTasks = [
    { id: 1, title: 'Test Task 1', description: 'Description 1', isCompleted: false, createdAt: '2024-01-01' },
    { id: 2, title: 'Test Task 2', description: 'Description 2', isCompleted: true, createdAt: '2024-01-02' },
  ];

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Mock the API responses
    const { getTasks, deleteTask, updateTask } = require('./services/api');
    
    getTasks.mockResolvedValue({ data: mockTasks });
    deleteTask.mockResolvedValue({});
    updateTask.mockResolvedValue({});
  });

  it('renders the task list correctly', async () => {
    render(<TaskList />);

    expect(await screen.findByText('Test Task 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
  });


  it('displays a message when no tasks are available', async () => {
    const { getTasks } = require('./services/api');
    getTasks.mockResolvedValue({ data: [] });  // Empty task list
    
    render(<TaskList />);
    
    expect(await screen.findByText('Task List')).toHaveClass('empty');
  });

  //   These tests are a work in progress. With more time they would be refined

//   it('allows marking a task as completed', async () => {
//     render(<TaskList />);
  
//     // Ensure the checkbox is rendered and get the first checkbox
//     const checkbox = await screen.findAllByRole('checkbox');
    
//     // Check if the task is not completed initially
//     expect(checkbox[0]).not.toBeChecked();
    
//     // Fire click event on the first checkbox
//     fireEvent.click(checkbox[0]);
  
//     // Check if the checkbox is now checked
//     expect(checkbox[0]).toBeChecked();
//   });
  
//   it('opens the edit form when clicking edit', async () => {
//     const { container } = render(<TaskList />);
  
//     // Ensure the edit buttons are rendered and wait for them
//     const editButtons = await container.querySelectorAll('.delete');
    
//     // Fire click event on the first edit button
//     fireEvent.click(editButtons[0]);
  
//     // Check if the title input is in the document (meaning the form is open)
//     expect(await screen.findByPlaceholderText('Title')).toBeInTheDocument();
//   });
  

//   it('deletes a task when delete button is clicked', async () => {
//     const { container } = render(<TaskList />);
  
//     // Get all delete buttons by class name
//     const deleteButtons = await container.querySelectorAll('.delete');
    
//     // Click the first delete button
//     fireEvent.click(deleteButtons[0]);
  
//     // Ensure the task is no longer in the document
//     expect(screen.queryByText('Test Task 1')).not.toBeInTheDocument();
//   });
});
