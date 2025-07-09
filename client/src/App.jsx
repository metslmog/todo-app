import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import ProjectView from './pages/ProjectView';
import Navbar from './components/Navbar';


function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Router>
      <div style={{display: 'flex'}}>
        <Navbar />
        <div style={{marginLeft: '200px', padding: '16px', width: '100%', minHeight: '100vh'}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:projectId" element={<ProjectView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;