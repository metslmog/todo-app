import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onUpdate }) {
    // Define priority order (lower number = higher priority)
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    
    // Sort tasks by due date first, then by priority
    const sortedTasks = [...tasks].sort((a, b) => {
        // First, sort by due date
        const dateA = a.dueDate ? new Date(a.dueDate) : new Date('9999-12-31'); // Tasks without due date go to end
        const dateB = b.dueDate ? new Date(b.dueDate) : new Date('9999-12-31');
        
        if (dateA.getTime() !== dateB.getTime()) {
            return dateA - dateB; // Sort by date ascending (earliest first)
        }
        
        // If due dates are the same (or both null), sort by priority
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    return (
        <div className="border-t border-b border-gray-300">
            <ul className="divide-y divide-gray-300">
                {sortedTasks.map((task) => (
                    <TaskItem key={task._id} task={task} onDelete={onDelete} onUpdate={onUpdate} />
                ))}
            </ul>
        </div>
    );
}

export default TaskList;