import React, { useState, useEffect } from 'react';

function App() {
  const [names, setNames] = useState([]);
  const [newName, setNewName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchNames();
  }, []);

  const fetchNames = async () => {
    try {
      const response = await fetch('http://localhost:100/api_v1/names');
      const data = await response.json();
      setNames(data);
    } catch (error) {
      setMessage('Error fetching names');
    }
  };

  const delRequest = async (id) => {
    try {
      const response = await fetch(`http://localhost:100/api_v1/?id=${id}`, {
        // const response = await fetch(`http://nginx:80/api_v1/?id=${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchNames(); 
        alert('Name deleted successfully');
      } else {
        setMessage('Error deleting name');
      }
    } catch (error) {
      setMessage('Error deleting name');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:100/api_v1/names', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      });
      
      if (response.ok) {
        setNewName('');
        fetchNames();
        setMessage('Name added successfully!');
      } else {
        setMessage('Error adding name');
      }
    } catch (error) {
      setMessage('Error adding name');
    }
  };

  return (
    <div>
      <h1>Name</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter a name"
            required
          />
          <button 
            type="submit"
          >
            Add Name
          </button>
        </div>
      </form>

      {message && (
        <div>
          {message}
        </div>
      )}

      <div >
        <h2 >Names List</h2>
        <ul >
          {names.map((item) => (
            <li id="{item.id}">
              {item.name}
              {item.id}
              <button 
            onClick={()=>delRequest(item.id)}
          >DELETE</button>
              </li>
          ))}
        </ul>
        {names.length === 0 && (
          <p>No names added yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;