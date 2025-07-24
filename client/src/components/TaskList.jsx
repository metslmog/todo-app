import TaskItem from "./TaskItem";
function TaskList({ tasks, onDelete, onUpdate }) {
    return (
        <ul className="space-y-2">
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} onDelete={onDelete} onUpdate={onUpdate} />
            ))}
        </ul>
    );
}

export default TaskList;