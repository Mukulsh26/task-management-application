import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useRouter } from 'next/router';

export default function Home({ initialTasks }) {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const router = useRouter();

  
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (savedTasks.length === 0) {
      
      localStorage.setItem('tasks', JSON.stringify(initialTasks));
      setTasks(initialTasks);
      setFilteredTasks(initialTasks);
    } else {
      
      setTasks(savedTasks);
      setFilteredTasks(savedTasks);
    }
  }, [initialTasks]); 

  
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  
  useEffect(() => {
    const results = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(results);
  }, [searchTerm, tasks]);

  const addTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);  
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));  
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);  
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));  
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);  
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));  
  };

  const toggleCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);  
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));  
  };

  const viewDetails = (id) => {
    router.push(`/task/${id}`);
  };

  return (
    <div>
      <h1>Task Manager</h1>

      <TaskForm onAdd={addTask} onUpdate={updateTask} editTask={editTask} />
      <br />
      {tasks.length > 0 && (
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}
      <TaskList
        tasks={filteredTasks}
        onUpdate={updateTask}
        onDelete={deleteTask}
        onToggle={toggleCompletion}
        setEditTask={setEditTask}
        onViewDetails={viewDetails}
      />
    </div>
  );
}

export async function getServerSideProps() {
  const initialTasks = [
    { id: 1, title: 'Sample Task', description: 'A sample task description.', priority: 'high', completed: false },
    { id: 2, title: 'Another Task', description: 'Another task description.', priority: 'medium', completed: false },
  ];
  return { props: { initialTasks } };
}
