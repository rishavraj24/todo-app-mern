// frontend/src/components/TodoList.js

import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onDelete, onUpdate, onEditText, onClearCompleted }) {
  // Check if there are any completed todos to decide if we show the button
  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    <div>
      <h3>My To-Do List</h3>
      {/* --- NEW: Clear Completed Button --- */}
      {hasCompletedTodos && (
        <button onClick={onClearCompleted} className="clear-btn">
          Clear All Completed
        </button>
      )}
      <div className="todo-list">
        {todos.map(currentTodo => (
          <TodoItem
            todo={currentTodo}
            key={currentTodo._id}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onEditText={onEditText} // Pass edit function down
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList;