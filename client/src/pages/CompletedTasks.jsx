import TaskList from "../components/TaskList";
import useTasks from '../hooks/useTasks';

function CompletedTasks() {
    const { tasks, loading, updateExistingTask, deleteExistingTask } = useTasks(true);

    return (
        <div className="min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Completed Tasks</h1>
            <TaskList tasks={tasks} onDelete={deleteExistingTask} onUpdate={updateExistingTask} />
        </div>
    );
}


export default CompletedTasks;
