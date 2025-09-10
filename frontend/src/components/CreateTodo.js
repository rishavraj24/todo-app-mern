// frontend/src/components/CreateTodo.js (Updated with Auth)
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

function CreateTodo({ onTodoCreated }) {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const { userData } = useContext(UserContext); // Get user data from context

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    const newTodo = { text, dueDate };

    axios.post('http://localhost:5000/todos/add', newTodo, {
      headers: { 'x-auth-token': userData.token } // Send the token
    })
    .then(() => onTodoCreated());

    setText('');
    setDueDate('');
  };

  return (
    <form onSubmit={onSubmit} className="create-todo-form">
      <div className="form-group"><label>New To-Do:</label><input type="text" value={text} onChange={(e) => setText(e.target.value)} required /></div>
      <div className="form-group"><label>Due Date (Optional):</label><input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /></div>
      <input type="submit" value="Add To-Do" />
    </form>
  );
}

export default CreateTodo;