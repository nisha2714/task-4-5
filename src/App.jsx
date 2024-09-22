import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DataGridComponent from './components/DataGridComponent';
import TaskList from './components/TaskList';

function App() {
  return (
    <Router>
      <div>
        <nav style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
          <ul style={{ display: 'flex', gap: '20px', listStyleType: 'none' }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/datagrid">Data Grid</Link>
            </li>
            <li>
              <Link to="/tasklist">Task List</Link>
            </li>
          </ul>
        </nav>

        {/* Routes replaces Switch in React Router v6 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/datagrid" element={<DataGridPage />} />
          <Route path="/tasklist" element={<TaskListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => (
  <div style={{ padding: '20px' }}>
    <h1>Welcome to Task Management App</h1>
    <p>Select one of the options from the menu to proceed.</p>
  </div>
);

const DataGridPage = () => (
  <div style={{ padding: '20px' }}>
    <h2>Data Grid</h2>
    <DataGridComponent />
  </div>
);

const TaskListPage = () => (
  <div style={{ padding: '20px' }}>
    <h2>Task List</h2>
    <TaskList />
  </div>
);

export default App;
