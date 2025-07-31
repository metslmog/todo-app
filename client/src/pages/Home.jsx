import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';
import useTasks from '../hooks/useTasks';

function Home() {
    const { 
        tasks, 
        loading, 
        addNewTask, 
        updateExistingTask, 
        deleteExistingTask 
    } = useTasks(false);

    return (
        <div className="min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Daily Focus</h1>
            <AddTaskForm onTaskAdded={addNewTask} />
            <p className="text-sm">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</p>
            <TaskList tasks={tasks} onDelete={deleteExistingTask} onUpdate={updateExistingTask} />
            
        </div>
    );
}

export default Home;