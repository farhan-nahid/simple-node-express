import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState();

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className='App'>
      <h1>Total User: {users.length}</h1>
      <ul>
        {
          // map users
          users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
