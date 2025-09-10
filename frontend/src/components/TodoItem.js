// frontend/src/components/TodoItem.js (Final Version)

import React, { useState } from 'react';

function TodoItem({ todo, onDelete, onUpdate, onEditText }) {
  // State to manage if the item is being edited
  const [isEditing, setIsEditing] = useState(false);
  // State to hold the text while editing
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    onEditText(todo._id, editText);
    setIsEditing(false); // Exit editing mode
  };

  return (
    <div className="todo-item">
      {/* Conditional rendering: show input if editing, otherwise show text */}
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave} // Save when the input loses focus
          onKeyPress={(e) => { if (e.key === 'Enter') handleSave(); }} // Save on Enter key
          autoFocus // Automatically focus the input
        />
      ) : (
        <div className="todo-text">
          <p className={todo.completed ? 'completed' : ''}>{todo.text}</p>
          {todo.dueDate && (
            <small>Due: {new Date(todo.dueDate).toLocaleDateString()}</small>
          )}
        </div>
      )}

      <div className="todo-actions">
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onUpdate(todo._id)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => onDelete(todo._id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoItem;