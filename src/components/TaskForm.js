import { useState, useEffect } from 'react';

export default function TaskForm({ onAdd, onUpdate, editTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setPriority(editTask.priority);
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = {
      id: editTask ? editTask.id : Date.now(),
      title,
      description,
      priority,
      completed: editTask ? editTask.completed : false,
    };

    editTask ? onUpdate(task) : onAdd(task);

    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button type="submit">{editTask ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
}
