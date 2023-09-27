import React, { useEffect, useState } from 'react';
import Task from './components/Task';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1/todos')
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    const newTaskObject = {
      id: tasks.length + 1,
      title: newTask,
      completed: false,
    };
    setTasks([...tasks, newTaskObject]);
    setNewTask('');
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleEditTask = (taskId, editedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title: editedTask } : task
    );
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1 className="mt-4">Todo App</h1>
      <div className="input-group mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleAddTask}
          >
            Add
          </button>
        </div>
      </div>
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="showCompleted"
          checked={showCompleted}
          onChange={() => setShowCompleted(!showCompleted)}
        />
        <label className="form-check-label" htmlFor="showCompleted">
          Show Completed
        </label>
      </div>
      <div className='cards'>
        {tasks
          .filter((task) => !showCompleted || task.completed)
          .map((task) => (
            <Task
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              onComplete={handleToggleComplete}
            />
          ))}
      </div>
    </div>
  );
};

export default App;