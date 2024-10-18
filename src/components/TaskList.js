export default function TaskList({ tasks, onUpdate, onDelete, onToggle, setEditTask }) {
    const sortedTasks = tasks
        .sort((a, b) => {
            const priorities = { high: 3, medium: 2, low: 1 };
            return priorities[b.priority] - priorities[a.priority];
        })
        .sort((a, b) => a.completed - b.completed);

    return (
        <div>
            {sortedTasks.map((task) => (
                <div
                    key={task.id}
                    style={{
                        backgroundColor: getTaskColor(task.priority),
                        textDecoration: task.completed ? 'line-through' : 'none',
                    }}
                >
                    <h2>
                        {task.title} {" "} 
                        <button onClick={() => onToggle(task.id)}>
                            {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                        </button>
                    </h2>
                    <p>{task.description}</p>
                    {!task.completed && (
                        <>
                            <button onClick={() => setEditTask(task)}>Edit</button>{" "}
                        </>
                    )}
                    <button onClick={() => onDelete(task.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

function getTaskColor(priority) {
    if (priority === 'high') return '#D7263D';
    if (priority === 'medium') return '#FFC857';
    return '#3BCEAC';
}
