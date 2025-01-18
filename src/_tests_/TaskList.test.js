import React from 'react'; 
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from '../components/TaskList';

const mockTasks = [
  { id: 1, title: 'Task 1', description: 'Description 1', priority: 'high', completed: false },
  { id: 2, title: 'Task 2', description: 'Description 2', priority: 'medium', completed: false },
];

const mockOnUpdate = jest.fn();
const mockOnDelete = jest.fn();
const mockOnToggle = jest.fn();
const mockSetEditTask = jest.fn();
const mockOnViewDetails = jest.fn();

describe('TaskList Component', () => {
  test('renders tasks correctly', () => {
    render(
      <TaskList
        tasks={mockTasks}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        setEditTask={mockSetEditTask}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  test('calls onToggle when the mark as completed button is clicked', () => {
    const mockOnToggle = jest.fn();
    const mockTasks = [
      { id: 1, title: 'Task 1', description: 'Description 1', priority: 'high', completed: false },
      { id: 2, title: 'Task 2', description: 'Description 2', priority: 'medium', completed: true },
    ];
  
    render(<TaskList tasks={mockTasks} onUpdate={jest.fn()} onDelete={jest.fn()} onToggle={mockOnToggle} />);
  
    // Select the "Mark as Completed" button for Task 1 using data-testid
    const toggleButton1 = screen.getByTestId('toggle-button-1');
    
    fireEvent.click(toggleButton1);
  
    // Verify if onToggle was called with the correct id (1 in this case)
    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });
  

  test('calls onDelete when the delete button is clicked', () => {
    const mockOnDelete = jest.fn();
    const mockTasks = [
      { id: 1, title: 'Task 1', description: 'Description 1', priority: 'high', completed: false },
      { id: 2, title: 'Task 2', description: 'Description 2', priority: 'medium', completed: false },
    ];
  
    render(<TaskList tasks={mockTasks} onUpdate={jest.fn()} onDelete={mockOnDelete} />);
  
    // Select the delete button for the first task using the data-testid
    const deleteButton = screen.getByTestId('delete-button-1');
  
    fireEvent.click(deleteButton);
  
    // Verify if onDelete was called with the correct id (1 in this case)
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
  
});
