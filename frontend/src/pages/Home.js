// frontend/src/pages/Home.js (Corrected)

import React, { useState, useEffect, useContext, useCallback } from 'react'; // 1. Import useCallback
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import TodoList from '../components/TodoList';
import CreateTodo from '../components/CreateTodo';

function Home() {
  const [todos, setTodos] = useState([]);
  const { userData } = useContext(UserContext);

  // 2. Wrap the function in useCallback
  const fetchTodos = useCallback(() => {
    if (userData.token) { // Ensure token exists before fetching
      axios.get('http://localhost:5000/todos/', {
        headers: { 'x-auth-token': userData.token }
      })
      .then(response => setTodos(response.data))
      .catch(error => console.log(error));
    }
  }, [userData.token]); // Tell useCallback that it depends on the token

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]); // 3. Now it is safe to add fetchTodos here

  // All handler functions now need to send the token
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/todos/${id}`, { headers: { 'x-auth-token': userData.token }})
      .then(() => fetchTodos());
  };

  const handleUpdate = (id) => {
    axios.post(`http://localhost:5000/todos/${id}/update`, null, { headers: { 'x-auth-token': userData.token }})
      .then(() => fetchTodos());
  };

  const handleEditText = (id, newText) => {
    axios.post(`http://localhost:5000/todos/${id}/edit`, { text: newText }, { headers: { 'x-auth-token': userData.token }})
      .then(() => fetchTodos());
  };

  const handleClearCompleted = () => {
    axios.delete('http://localhost:5000/todos/completed/clear', { headers: { 'x-auth-token': userData.token }})
      .then(() => fetchTodos());
  };

  return (
    <div className="home-page">
      <CreateTodo onTodoCreated={fetchTodos} />
      <TodoList
        todos={todos}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        onEditText={handleEditText}
        onClearCompleted={handleClearCompleted}
      />
    </div>
  );
}

export default Home;