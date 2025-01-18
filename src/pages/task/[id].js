import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function TaskDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = savedTasks.find((t) => t.id === parseInt(id));
    if (task) {
      setTask(task);
    }
  }, [id]);

  if (!task) {
    return <p>Task not found!</p>;
  }

  return (
    <div>
      <h1>Task Details</h1>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
      <button onClick={() => router.push('/')}>Go Back</button>
    </div>
  );
}
