import TaskItem from "./TaskItem";
function TaskList({ tasks, onDelete }) {
    return (
        <ul className="space-y-2">
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} onDelete={onDelete} />
            ))}
        </ul>
    );
}

export default TaskList;