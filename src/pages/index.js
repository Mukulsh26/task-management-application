import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Home({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(initialTasks);
  const [editTask, setEditTask] = useState(null);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tasksToUse = savedTasks.length ? savedTasks : initialTasks;
    setTasks(tasksToUse);
    setFilteredTasks(tasksToUse);
  }, []);

  // Save tasks to localStorage on every update
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  //Search filter function
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
    setFilteredTasks(updatedTasks);
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const toggleCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Task Manager</h1>

      <TaskForm onAdd={addTask} onUpdate={updateTask} editTask={editTask} />
      <br />
     { tasks != 0 && ( <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />)}
      <TaskList
        tasks={filteredTasks}
        onUpdate={updateTask}
        onDelete={deleteTask}
        onToggle={toggleCompletion}
        setEditTask={setEditTask}
      />
    </div>
  );
}

// Server-side rendering: Fetch initial tasks
export async function getServerSideProps() {
  const initialTasks = [
    { id: 1, title: 'Sample Task', description: 'A sample task description.', priority: 'high', completed: false },
    { id: 2, title: 'Another Task', description: 'Another task description.', priority: 'medium', completed: false },
  ];
  return { props: { initialTasks } };
}
