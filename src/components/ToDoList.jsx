import React, { useState, useEffect } from 'react';


const ToDoList = () => {
  const [tasks, setTasks] = useState(() => {
    const data = localStorage.getItem('expense-tracker-todo');
    return data ? JSON.parse(data) : [];
  });

  const [taskText, setTaskText] = useState('');

  useEffect(() => {
    localStorage.setItem('expense-tracker-todo', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskText.trim() === '') return;
    setTasks([...tasks, { text: taskText, completed: false }]);
    setTaskText('');
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <h2>Upcoming Expenses / To-Do</h2>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Enter upcoming expense or task..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="todo-list">
        {tasks && tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={index} className={task.completed ? 'completed' : ''}>
              <span onClick={() => toggleTask(index)}>{task.text}</span>
              <button onClick={() => deleteTask(index)}> Delete </button>
            </li>
          ))
        ) : (
          <p className="empty">No upcoming expenses yet!</p>
        )}
      </ul>
    </div>
  );
};

export default ToDoList;
