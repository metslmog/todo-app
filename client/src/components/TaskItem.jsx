function TaskItem({ task }) {
  return (
    <li className="p-2 border bg-white flex">
      <span>{task.title}</span>
      <span className="text-sm text-gray-500">{task.priority}</span>
    </li>
  );
}

export default TaskItem;