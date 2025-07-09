import { useParams } from 'react-router-dom';

function ProjectView() {
    const { projectId } = useParams();
    
    return (
        <div>
        <h1 className='text-2xl font-bold mb-4'>Project View</h1>
        <p>Viewing project with ID: {projectId}</p>
        {/* Add more components or features here */}
        </div>
    );
}

export default ProjectView;