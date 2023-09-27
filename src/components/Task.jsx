import React, { useState } from 'react';

const Task = ({ task, onDelete, onEdit, onComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.title);
  const [checked, setChecked] = React.useState(true);

  const handleEdit = () => {
    onEdit(task.id, editedTask);
    setIsEditing(false);
  };

  return (
    <div className="task">
      {isEditing ? (
        <div className='edit'>
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <div className='box'>
            <input type="checkbox" id='showcompleted' defaultChecked={task.completed ? 'checked':''} />
          <label htmlFor='showcompleted' 
            className={task.completed ? 'completed' : ''}
            onClick={() => onComplete(task.id)}
          >
            {task.title}
          </label>
          <div className='btn1'>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;